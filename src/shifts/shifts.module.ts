import { Module } from "@nestjs/common";
import { ShiftsService } from "./shifts.service";
import { ShiftsController } from "./shifts.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ShiftGateway } from "./shifts.gateway";

@Module({
  controllers: [ShiftsController],
  providers: [ShiftsService, PrismaService, ShiftGateway],
})
export class ShiftsModule {}
