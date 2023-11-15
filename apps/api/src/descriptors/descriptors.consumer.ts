import { OnQueueActive, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { execSync } from "child_process";
import * as fs from "fs";

@Processor("descriptors")
export class DescriptorsConsumer {
  @OnQueueActive()
  onActive(job: Job): void {
    console.log(`Processing job ${job.id}...`);
  }

  @OnQueueFailed()
  onError(job: Job, error: Error): void {
    console.log(`Error in job: ${job.id}. Error: ${error.message}`);
  }

  @Process("calculate-descriptors")
  async calculateDescriptors({ data }: Job): Promise<void> {
    const userDirPath = data.filename.split("/")[0];
    const filename = data.filename.split("/")[1];

    const command: string = `Mold2 -i /files/${userDirPath}/${filename} -o /files/${userDirPath}/out.txt -r /files/${userDirPath}/report.txt`;

    execSync(command);

    const isolateDescriptorsCommand: string = `cat /files/${userDirPath}/out.txt | cut -f 1,2,144,313,471 > /files/${userDirPath}/isolatedDescriptors.txt`;

    execSync(isolateDescriptorsCommand);

    const isolatedDescriptorsRaw: string = fs.readFileSync(
      `/files/${userDirPath}/isolatedDescriptors.txt`,
      "utf-8"
    );

    const isolatedDescriptorsContent: string[] =
      isolatedDescriptorsRaw.split(/\r?\n/);
    const descriptorsResult: string[] = [];

    function isValidNumber(value: string): boolean {
      return /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(value);
    }

    for (let i: number = 0; i < isolatedDescriptorsContent.length; i++) {
      // Check if it's the last iteration
      if (i === isolatedDescriptorsContent.length - 1) {
        continue; // Skip the last execution
      }

      const line: string = isolatedDescriptorsContent[i];
      const lineArr: string[] = line.split("\t");
      const Nmbr: string = lineArr[0];
      const AutoId: string = lineArr[1];
      const valueA: string = lineArr[2];
      const valueB: string = lineArr[3];
      const valueC: string = lineArr[4];

      let valueY: string | number = "Y";

      if (
        isValidNumber(valueA) &&
        isValidNumber(valueB) &&
        isValidNumber(valueC)
      ) {
        const A: number = parseFloat(valueA);
        const B: number = parseFloat(valueB);
        const C: number = parseFloat(valueC);

        valueY =
          55.8464453262526 * A +
          460.629869289697 * B +
          1576.39573192884 * C -
          1.9879494191188 * A ** 2 -
          22.9077094736772 * A * B -
          53.9227383846824 * A * C -
          39.8670687817909 * B ** 2 -
          1167.06893852196 * B * C -
          1428.25287851626 * C ** 2 +
          0.0256858679064252 * A ** 3 +
          0.864766589013676 * A ** 2 * B +
          1.2305514402288 * A ** 2 * C -
          3.65447333045831 * A * B ** 2 +
          15.5104088878442 * A * B * C +
          19.7110745910283 * A * C ** 2 +
          10.9912765200239 * B ** 3 +
          251.546923335286 * B ** 2 * C +
          985.496996913981 * B * C ** 2 +
          530.744373207641 * C ** 3 +
          0.000041787198663648 * A ** 4 -
          0.013567266110872 * A ** 3 * B -
          0.0169558830453452 * A ** 3 * C +
          0.0953162922602021 * A ** 2 * B ** 2 -
          0.0350116951897071 * A ** 2 * B * C +
          0.017519204634866 * A ** 2 * C ** 2 -
          0.317300303201679 * A * B ** 3 -
          0.804582936568995 * A * B ** 2 * C -
          7.91171045385113 * A * B * C ** 2 -
          4.02023508785023 * A * C ** 3 +
          0.676843423025609 * B ** 4 -
          12.6680357727857 * B ** 3 * C -
          144.091062037205 * B ** 2 * C ** 2 -
          206.849984324245 * B * C ** 3 -
          62.4840884569312 * C ** 4 -
          743.63518669;
      }

      descriptorsResult.push(
        `${Nmbr}\t${AutoId}\t${valueA}\t${valueB}\t${valueC}\t${valueY}`
      );
    }

    const file: fs.WriteStream = fs.createWriteStream(
      `/files/${userDirPath}/descriptorsResult.txt`
    );
    file.on("error", function (): void {
      /* error handling */
    });
    descriptorsResult.forEach(function (v: string): void {
      file.write(v + "\n");
    });
    file.end();
  }
}
