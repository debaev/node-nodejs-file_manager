import { createReadStream } from "node:fs";
import { join, isAbsolute } from "node:path";

export const readFileContent = async (currentDir, targetFilePath) => {
  if (isAbsolute(targetFilePath)) {
    let readStream = createReadStream(targetFilePath, "utf8");
  readStream.on("data", (result) => process.stdout.write(`${result}\n`));
  } else {
    let readStream = createReadStream(join(currentDir, targetFilePath), "utf8");
    readStream.on("data", (result) => process.stdout.write(`${result}\n`));
  }
};
