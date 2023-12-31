import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DescriptorsModule } from "./descriptors/descriptors.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
})
export class AppModule {}
