import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Descriptor } from "@prisma/client";
import { Request } from "express";
import { UsernameGuard } from "src/username.guard";

import multerConfig from "../multer.config";

import { DescriptorsService } from "./descriptors.service";

@Controller("descriptors")
export class DescriptorsController {
  constructor(private descriptorsService: DescriptorsService) {}

  @UseGuards(UsernameGuard)
  @Post("/")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async calculateDescriptors(
    // eslint-disable-next-line no-undef
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ): Promise<void> {
    // @ts-expect-error
    this.descriptorsService.addToQueue(file, req.username);
  }

  @UseGuards(UsernameGuard)
  @Get("/")
  async getDescriptors(@Req() req: Request): Promise<Partial<Descriptor>[]> {
    const descriptors = await this.descriptorsService.retrieveDescriptors(
      // @ts-expect-error
      req.username
    );

    return descriptors;
  }

  @Get("/:id")
  async getDescriptor(@Param("id") id: string): Promise<Descriptor> {
    const descriptor = await this.descriptorsService.retrieveDescriptor(id);

    return descriptor;
  }
}
