import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "src/auth.guard";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
