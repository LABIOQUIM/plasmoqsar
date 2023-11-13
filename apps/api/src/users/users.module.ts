import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  imports: [PrismaModule],
})
export class UsersModule {}
