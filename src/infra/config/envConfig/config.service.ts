import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as fs from "fs";

@Injectable()
export class EnvConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getBooleanValue(key: string): boolean {
    const value = this.envConfig[key];

    return value === "true" ? true : value === "false" ? false : undefined;
  }
}
