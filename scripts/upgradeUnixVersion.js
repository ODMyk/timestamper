import {open} from "node:fs/promises";

const filesToModify = ["./test1.js", "./test2.js"];
const timestamp = `${Math.floor(Date.now() / 1000)}`;

const modify = async (path) => {
  const fd = await open(path, "r+");
  try {
    const content = (await fd.readFile()).toString();
    const replacedContent = content.replaceAll("${unix_timestamp}", timestamp);
    await fd.truncate();
    await fd.write(replacedContent, 0);
  } finally {
    await fd.close();
  }
};

filesToModify.forEach(modify);
