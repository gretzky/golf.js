const execSync = require("child_process").execSync;
const sh = require("shelljs");

module.exports = function generateLicense() {
  const date = new Date();
  const year = date.getFullYear();

  const getUsername = execSync("git config --global user.name").toString();
  const sanitizedUsername = getUsername.replace(/^\s+|\s+$/g, "");

  const username = sanitizedUsername;

  sh.exec(
    `echo 'The MIT License (MIT)\n\nCopyright (c) ${year} ${username}' | cat - LICENSE > temp && mv temp LICENSE`
  ),
    { silent: true };
};
