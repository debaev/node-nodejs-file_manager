import { readdir } from "node:fs/promises";

export const getDirContents = async (path) => {
  const list = await readdir(path, { withFileTypes: true });

  if (list.length === 0) {
    console.log(`Directory is empty\n`);
  } else {
    for (const file of list) console.log(file.name);
  }
  
};
