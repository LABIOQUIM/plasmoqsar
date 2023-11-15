import {
  Controller,
  Get,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth.guard";

import multerConfig from "../multer.config";

import { DescriptorsService } from "./descriptors.service";

@Controller("descriptors")
export class DescriptorsController {
  constructor(private descriptorsService: DescriptorsService) {}

  @UseGuards(AuthGuard)
  @Post("/")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async calculateDescriptors(
    // eslint-disable-next-line no-undef
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ): Promise<void> {
    // @ts-expect-error
    this.descriptorsService.addToQueue(file, req.user.username);
  }

  @UseGuards(AuthGuard)
  @Get("/")
  async getDescriptors(@Req() req: Request): Promise<StreamableFile> {
    const file: Buffer = await this.descriptorsService.retrieveDescriptors(
      // @ts-expect-error
      req.user.username
    );

    return new StreamableFile(file);
  }
}
