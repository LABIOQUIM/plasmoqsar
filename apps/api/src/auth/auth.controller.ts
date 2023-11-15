import { Body, Controller, Post } from "@nestjs/common";

import { AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/")
  async login(@Body() body: AuthDto) {
    return this.authService.validateUser(body.identifier, body.pass);
  }
}
