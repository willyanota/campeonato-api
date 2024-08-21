import * as fs from "fs";
import * as path from "path";

const envFileLocation = path.join(
  __dirname,
  "../../../..",
  "envs",
  ".env.".concat(process.env.NODE_ENV || "local"),
);

const envFileContent = fs.readFileSync(envFileLocation);

fs.writeFileSync("./.env", envFileContent.toString());
