import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

type Select = {
  [key in keyof User]: boolean;
};

@Injectable()
export class UsersService {
  private select: Select = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const isExistingUser = !!(await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: data.email } },
          { username: { equals: data.username } },
        ],
      },
    }));

    if (isExistingUser) {
      throw new HttpException("EXISTING_USER", HttpStatus.CONFLICT);
    }

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: this.select,
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByIdentifier(identifier: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const isExistingUser = !!(await this.prisma.user.findUnique({
      where: {
        id,
      },
    }));

    if (!isExistingUser) {
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: this.select,
    });

    return user;
  }

  async remove(id: string) {
    const isExistingUser = !!(await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: this.select,
    }));

    if (!isExistingUser) {
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
      select: this.select,
    });
  }
}
