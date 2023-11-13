import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { DescriptorsModule } from "./descriptors/descriptors.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: "/queues",
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    DescriptorsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
