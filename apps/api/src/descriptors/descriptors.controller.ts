import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DescriptorsService } from './descriptors.service';
import multerConfig from '../multer.config';
import { DescriptorsDto } from './descriptors.dto';

@Controller('descriptors')
export class DescriptorsController {
  constructor(private descriptorsService: DescriptorsService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async calculateDescriptors(
    @Body() body: DescriptorsDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    this.descriptorsService.addToQueue(file, body.username);
  }

  @Get('/:username')
  async getDescriptors(
    @Param('username') username: string,
  ): Promise<StreamableFile> {
    const file: Buffer =
      await this.descriptorsService.retrieveDescriptors(username);

    return new StreamableFile(file);
  }
}
