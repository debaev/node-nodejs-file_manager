import { rm } from "fs/promises";
import { join } from "path";

export const deleteFile = async (currentDir, targetFilePath) => {
  const deletedFilePath = join(currentDir, targetFilePath);
  await rm(deletedFilePath);
};
