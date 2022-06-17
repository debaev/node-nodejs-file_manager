import { createBrotliCompress } from "zlib";
import { open } from "fs/promises";
import { resolve, basename, join } from "path";
import { promisify } from "util";
import stream from "stream";

export const compressFile = async (
  currentDir,
  targetFilePath,
  destFilePath
) => {
  const filePath = resolve(currentDir, targetFilePath);
  const compressFileName = basename(filePath) + ".br";
  const compressFilePath = join(currentDir, destFilePath, compressFileName);
  const file = await open(filePath, "r");
  const compressFile = await open(compressFilePath, "wx");
  const readable = file.createReadStream();
  const gzip = createBrotliCompress();
  const destination = compressFile.createWriteStream();

  const pipeline = promisify(stream.pipeline);
  await pipeline(readable, gzip, destination);

  console.log(`Compressed ${filePath} to ${compressFilePath}`);
};
