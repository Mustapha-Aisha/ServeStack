import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ShiftGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to keep track of subscriptions: userId -> Set of Socket clients
  private subscriptions: Map<number, Set<Socket>> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.subscriptions.forEach((sockets, userId) => {
      if (sockets.has(client)) {
        sockets.delete(client);
      }
    });
  }

  @SubscribeMessage('subscribeToShiftUpdates')
  handleSubscribe(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    if (!this.subscriptions.has(userId)) {
      this.subscriptions.set(userId, new Set());
    }
    this.subscriptions.get(userId).add(client);
    console.log(`Client ${client.id} subscribed to updates for user ${userId}`);
  }

  @SubscribeMessage('unsubscribeFromShiftUpdates')
  handleUnsubscribe(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    if (this.subscriptions.has(userId)) {
      this.subscriptions.get(userId).delete(client);
      console.log(`Client ${client.id} unsubscribed from updates for user ${userId}`);
    }
  }

  broadcastShiftUpdate(userId: number, update: any) {
    const clients = this.subscriptions.get(userId);
    if (clients) {
      clients.forEach(client => {
        client.emit('shiftUpdate', update);
      });
    }
  }

  sendShiftNotification(userId: number, message: string) {
    const clients = this.subscriptions.get(userId);
    if (clients) {
      clients.forEach(client => {
        client.emit('shiftNotification', { message });
      });
    }
  }

}
