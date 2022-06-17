import { open } from "node:fs/promises";
import { resolve, basename, join, dirname } from "node:path";

export const copyFile = async (currentDir, targetFilePath, destFilePath) => {
  const baseFilePath = resolve(currentDir, targetFilePath);
  const filename = basename(baseFilePath);
  const newFilePath = join(currentDir, destFilePath, filename);
  if (dirname(baseFilePath) === dirname(newFilePath)) {
    throw new Error("Cannot copy file ind place");
  }
  const file = await open(baseFilePath, "r");
  const newFile = await open(newFilePath, "wx");
  const readStream = file.createReadStream();
  const writeStream = newFile.createWriteStream();
  readStream.pipe(writeStream);
};
