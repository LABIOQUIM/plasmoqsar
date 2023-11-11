import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import * as fs from 'fs';

@Injectable()
export class DescriptorsService {
  constructor(@InjectQueue('descriptors') private descriptorsQueue: Queue) {}

  async addToQueue(file: Express.Multer.File, username: string): Promise<void> {
    await this.descriptorsQueue.add('calculate-descriptors', {
      username: username,
      filename: file.filename,
    });
  }

  async retrieveDescriptors(username: string): Promise<Buffer> {
    const filepath: string = `/files/${username}/out.txt`;
    const file: Buffer = await new Promise<Buffer>((resolve, reject): void => {
      fs.readFile(filepath, {}, (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return file;
  }
}
