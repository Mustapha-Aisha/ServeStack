# ServerStack NestJS API

## Description
ServeStack is a backend-first platform built for restaurant chains to manage shift-based operations, orders, deliveries, and payments — all from a unified system.

This repo powers the core engine that helps multi-branch restaurants:

Assign and manage staff shifts

Track and fulfill customer orders in real-time

Handle deliveries across outlets

Streamline and reconcile payments

Designed with scalability and modularity in mind, ServeStack is ideal for growing businesses that need clean architecture, reliable APIs, and efficient service logic.

Built with 💻 NestJS, PostgreSQL, and a whole lot of caffeine.

## Dependencies Installation

```bash
$ yarn install
```

## Environment setup

```bash
$ cat .env.sample > .env
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
