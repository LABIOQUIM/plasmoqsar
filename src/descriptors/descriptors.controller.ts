import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
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
  ) {
    this.descriptorsService.addToQueue(file, body.username);
  }

  @Get('/:username')
  async getDescriptors(@Param('username') username: string) {
    const file = await this.descriptorsService.retrieveDescriptors(username);

    return new StreamableFile(file);
  }
}
