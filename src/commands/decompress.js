import { createBrotliDecompress } from "zlib";
import { lstat, open } from "fs/promises";
import { basename, join } from "path";
import { promisify } from "util";
import stream from "stream";

const decompressFile = async (workingDir, pathToCompressedFile, pathToFile) => {
  const compressFilePath = join(workingDir, pathToCompressedFile);
  const compressFileName = basename(compressFilePath).replace(".br", "");
  const destFolder = join(workingDir, pathToFile);
  const statDir = await lstat(destFolder);

  if (!statDir.isDirectory()) {
    throw new Error("Not a directory");
  }

  const filePath = join(workingDir, destFolder, compressFileName);
  const file = await open(filePath, "wx");
  const compressFile = await open(compressFilePath, "r");
  const readable = compressFile.createReadStream();
  const gzip = createBrotliDecompress();
  const destination = file.createWriteStream();

  const pipeline = promisify(stream.pipeline);
  await pipeline(readable, gzip, destination);

  console.log(`Decompressed ${compressFilePath} to ${filePath}`);
};

export default decompressFile;
