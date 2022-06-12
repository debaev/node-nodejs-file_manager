import { createHash } from "crypto";
import { open } from "fs/promises";
import { resolve } from "path";
import { promisify } from "util";
import stream from "stream";

export const getHash = async (currentDir, targetFilePath) => {
  const fullFilePath = resolve(currentDir, targetFilePath);
  const file = await open(fullFilePath, "r");
  const readStream = file.createReadStream();
  const hash = createHash("sha256").setEncoding("hex");
  const pipeline = promisify(stream.pipeline);
  await pipeline(readStream, hash);
  console.log(`Hash of ${fullFilePath} is ${hash.read()}`);
};
