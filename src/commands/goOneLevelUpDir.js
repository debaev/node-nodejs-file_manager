import { join } from "node:path";

export const goOneLevelUpDir = async (currentDir, prevDir) => {
  const newWorkingDir = join(currentDir, prevDir);
  return newWorkingDir;
};
