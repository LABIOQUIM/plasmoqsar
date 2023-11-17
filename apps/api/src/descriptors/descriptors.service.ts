import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Descriptor } from "@prisma/client";
import { Queue } from "bull";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DescriptorsService {
  constructor(
    @InjectQueue("descriptors") private descriptorsQueue: Queue,
    private prisma: PrismaService
  ) {}

  // eslint-disable-next-line no-undef
  async addToQueue(file: Express.Multer.File, username: string): Promise<void> {
    const newDescriptor = await this.prisma.descriptor.create({
      data: {
        sdfName: file.filename,
        user: {
          connect: {
            username,
          },
        },
      },
    });
    await this.descriptorsQueue.add("calculate-descriptors", {
      descriptorId: newDescriptor.id,
      username,
      filename: file.filename,
    });
  }

  async retrieveDescriptors(username: string): Promise<Partial<Descriptor>[]> {
    const descriptors = await this.prisma.descriptor.findMany({
      where: {
        user: {
          username,
        },
      },
      select: {
        id: true,
        error: true,
        sdfName: true,
        createdAt: true,
        status: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return descriptors;
  }

  async retrieveDescriptor(id: string): Promise<Descriptor> {
    const descriptor = await this.prisma.descriptor.findUnique({
      where: {
        id,
      },
    });

    return descriptor;
  }
}
