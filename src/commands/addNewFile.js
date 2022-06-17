import { writeFile } from "fs/promises";
import { join } from "node:path";

export const addNewFile = async (currentDir, targetFileName) => {
  const filepath = join(currentDir, targetFileName);
  await writeFile(filepath, "", { flag: "wx" });
};
