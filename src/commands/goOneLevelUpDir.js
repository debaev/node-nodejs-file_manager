import { join, isAbsolute } from "node:path";

export const goOneLevelUpDir = async (currentDir, prevDir) => {
  if (isAbsolute(prevDir)) {
    return prevDir;
  } else {
    const newWorkingDir = join(currentDir, prevDir);
    return newWorkingDir;
  }
};
