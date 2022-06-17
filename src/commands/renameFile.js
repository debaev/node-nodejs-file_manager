
import { access } from "node:fs";
import { rename } from "node:fs/promises";
import { join } from "node:path";


export const renameFile = async (currentDir, targetFilePath, newFilename) => {
  const filePrevName = join(currentDir, targetFilePath);
  const fileNextName = join(currentDir, newFilename);

  access(filePrevName, async (_) => {
    if (_) {
      console.log('No such file!');
    } else {
      rename(filePrevName, fileNextName);
    }
  });
  
};

