import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersService } from "src/users/users.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
  imports: [PrismaModule, PassportModule, JwtModule],
})
export class AuthModule {}
