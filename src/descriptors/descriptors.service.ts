import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import * as fs from 'fs';

@Injectable()
export class DescriptorsService {
  constructor(@InjectQueue('descriptors') private descriptorsQueue: Queue) {}

  async addToQueue(file: Express.Multer.File, username: string) {
    await this.descriptorsQueue.add('calculate-descriptors', {
      username: username,
      filename: file.filename,
    });
  }

  async retrieveDescriptors(username: string) {
    const filepath = `/app/Files/${username}/out.txt`;
    const file = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filepath, {}, (err, data) => {
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
