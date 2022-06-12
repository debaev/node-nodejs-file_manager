import { createReadStream } from "node:fs";
import { join } from "node:path";

export const readFileContent = async (currentDir, targetFilePath) => {
  let readStream = createReadStream(join(currentDir, targetFilePath), "utf8");
  readStream.on("data", (result) => process.stdout.write(`${result}\n`));
};
