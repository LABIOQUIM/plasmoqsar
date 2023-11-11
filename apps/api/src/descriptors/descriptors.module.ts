import { Module } from '@nestjs/common';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import {DescriptorsController} from "./descriptors.controller";
import {DescriptorsService} from "./descriptors.service";
import {DescriptorsConsumer} from "./descriptors.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'descriptors',
    }),

    BullBoardModule.forFeature({
      name: 'descriptors',
      adapter: BullAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
  ],
  controllers: [DescriptorsController],
  providers: [DescriptorsService, DescriptorsConsumer],
})
export class DescriptorsModule {}
