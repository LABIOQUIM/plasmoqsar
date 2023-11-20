import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { DescriptorsConsumer } from "./descriptors.consumer";
import { DescriptorsController } from "./descriptors.controller";
import { DescriptorsService } from "./descriptors.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "descriptors",
    }),

    BullBoardModule.forFeature({
      name: "descriptors",
      adapter: BullAdapter, // or use BullAdapter if you're using bull instead of bullMQ
    }),
  ],
  controllers: [DescriptorsController],
  providers: [DescriptorsService, DescriptorsConsumer, PrismaService],
})
export class DescriptorsModule {}
