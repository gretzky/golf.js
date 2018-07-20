const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const request = require("request");

module.exports = function generateGitignore() {
  let uname;
  const osPlatform = os.platform();

  if (osPlatform === "darwin") {
    uname = "macos";
  } else if (osPlatform === "win32") {
    uname = "windows";
  } else if (osPlatform === "linux") {
    uname = "linux";
  } else {
    return;
  }

  const output = `${uname},node`;

  request(`https://www.gitignore.io/api/${output}`).pipe(
    fs.createWriteStream(path.resolve(process.cwd(), ".gitignore"))
  );
};
