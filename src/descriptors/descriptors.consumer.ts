import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';
import { execSync } from 'child_process';

@Processor('descriptors')
export class DescriptorsConsumer {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id}...`);
  }

  @OnQueueFailed()
  onError(job: Job, error: Error) {
    console.log(`Error in job: ${job.id}. Error: ${error.message}`);
  }

  @Process('calculate-descriptors')
  async calculateDescriptors({ data }: Job) {
    const userDirPath = data.filename.split('/')[0];
    const filename = data.filename.split('/')[1];

    const command = `Mold2 -i /app/Files/${userDirPath}/${filename} -o /app/Files/${userDirPath}/out.txt`;

    execSync(command);

    const isolateDescriptorsCommand = `cat /app/Files/${userDirPath}/out.txt | cut -f 1,2,145,314,472 > /app/Files/${userDirPath}/isolatedDescriptors.txt`;

    execSync(isolateDescriptorsCommand);

    const isolatedDescriptorsRaw = fs.readFileSync(
      `/app/Files/${userDirPath}/isolatedDescriptors.txt`,
      'utf-8',
    );

    const isolatedDescriptorsContent = isolatedDescriptorsRaw.split(/\r?\n/);
    const descriptorsResult: string[] = [];

    function isValidNumber(value) {
      return /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(value);
    }

    for (let i = 0; i < isolatedDescriptorsContent.length; i++) {
      // Check if it's the last iteration
      if (i === isolatedDescriptorsContent.length - 1) {
        continue; // Skip the last execution
      }

      const line = isolatedDescriptorsContent[i];
      const lineArr = line.split('\t');
      const Nmbr = lineArr[0];
      const AutoId = lineArr[1];
      const valueA = lineArr[2];
      const valueB = lineArr[3];
      const valueC = lineArr[4];

      let valueY: string | number = 'Y';

      if (
        isValidNumber(valueA) &&
        isValidNumber(valueB) &&
        isValidNumber(valueC)
      ) {
        const A = parseFloat(valueA);
        const B = parseFloat(valueB);
        const C = parseFloat(valueC);

        valueY =
          -743.635 +
          55.846 * A +
          460.63 * B +
          1576.396 * C -
          1.988 * (A ^ 2) -
          22.908 * A * B -
          53.923 * A * C -
          39.867 * (B ^ 2) -
          1167.069 * B * C -
          1428.253 * (C ^ 2) +
          0.026 * (A ^ 3) +
          0.865 * (A ^ 2) * B +
          1.231 * (A ^ 2) * C -
          3.654 * A * (B ^ 2) +
          15.51 * A * B * C +
          19.711 * A * (C ^ 2) +
          10.991 * (B ^ 3) +
          251.547 * (B ^ 2) * C +
          985.497 * B * (C ^ 2) +
          530.744 * (C ^ 3) +
          0.0 * (A ^ 4) -
          0.014 * (A ^ 3) * B -
          0.017 * (A ^ 3) * C +
          0.095 * (A ^ 2) * (B ^ 2) -
          0.035 * (A ^ 2) * B * C +
          0.018 * (A ^ 2) * (C ^ 2) -
          0.317 * A * (B ^ 3) -
          0.805 * A * (B ^ 2) * C -
          7.912 * A * B * (C ^ 2) -
          4.02 * A * (C ^ 3) +
          0.677 * (B ^ 4) -
          12.668 * (B ^ 3) * C -
          144.091 * (B ^ 2) * (C ^ 2) -
          206.85 * B * (C ^ 3) -
          62.484 * (C ^ 4);
      }

      descriptorsResult.push(
        `${Nmbr}\t${AutoId}\t${valueA}\t${valueB}\t${valueC}\t${valueY}`,
      );
    }

    const file = fs.createWriteStream(
      `/app/Files/${userDirPath}/descriptorsResult.txt`,
    );
    file.on('error', function (err) {
      /* error handling */
    });
    descriptorsResult.forEach(function (v) {
      file.write(v + '\n');
    });
    file.end();
  }
}
