import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    if (user.password === pass) {
      return await this.generateJWT(user);
    }

    throw new HttpException("INVALID_CREDENTIALS", HttpStatus.UNAUTHORIZED);
  }

  async generateJWT(payload: Omit<User, "password">) {
    return {
      accessToken: this.jwtService.sign(
        { username: payload.username },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: "10m",
        }
      ),
    };
  }
}
