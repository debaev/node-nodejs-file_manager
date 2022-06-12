import { stdin as input, stdout as output } from "node:process";
import { homedir } from "node:os";
import { createInterface } from "node:readline";

import { getUserName } from "./helpers/getUserName.js";
import { goOneLevelUpDir } from "./commands/goOneLevelUpDir.js";
import { getDirContents } from "./commands/getFilesInDir.js";
import { readFileContent } from "./commands/readFilesContent.js";
import { addNewFile } from "./commands/addNewFile.js";
import { renameFile } from "./commands/renameFile.js";
import { copyFile } from "./commands/copyFile.js";
import { deleteFile } from "./commands/removeFile.js";
import { getHash } from "./commands/getHash.js";

const rl = createInterface({
  input,
  output,
});

const init = () => {
  let currentDir = homedir();

  rl.output.write(`\nWelcome to the File Manager, ${getUserName()}!\n`);
  rl.output.write(`\nYou are currently in ${currentDir}\n`);

  rl.on("line", async (input) => {
    input = input.toString().trim();
    const command = input.split(" ")[0];
    const targetFilePath = input.split(" ")[1];
    const destFilePath = input.split(" ")[2];

    try {
      switch (command) {
        case ".exit":
          rl.close();
          break;

        case "up":
          currentDir = await goOneLevelUpDir(currentDir, "..");
          break;

        case "cd":
          currentDir = await goOneLevelUpDir(currentDir, targetFilePath);
          break;

        case "ls":
          await getDirContents(currentDir);
          break;

        case "cat":
          await readFileContent(currentDir, targetFilePath);
          break;

        case "add":
          await addNewFile(currentDir, targetFilePath);
          break;

        case "os":
          await getOsInfo(targetFilePath);
          break;

        case "rn":
          await renameFile(currentDir, targetFilePath, destFilePath);
          break;

        case "cp":
          await copyFile(currentDir, targetFilePath, destFilePath);
          break;

        case "rm":
          await deleteFile(currentDir, targetFilePath);
          break;

        case "mv":
          await copyFile(currentDir, targetFilePath, destFilePath);
          await deleteFile(currentDir, targetFilePath);
          break;

        case "hash":
          await getHash(currentDir, targetFilePath);
          break;

        case "compress":
          await compressFile(currentDir, targetFilePath, destFilePath);
          break;

        default:
          rl.output.write(`\nInvalid input\n`);
          break;
      }

      console.log(`You are currently in, ${currentDir}`);
    } catch (error) {
      console.log(`Operation failed: ${error.message}`);
    }
  });

  rl.on("close", () => {
    rl.output.write(`Thank you for using File Manager, ${getUserName()}!`);
  });
};

init();
