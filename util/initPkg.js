const execSync = require("child_process").execSync;
const sh = require("shelljs");

let cmd;

function getCmd() {
  if (cmd) {
    return cmd;
  }

  try {
    execSync("yarnpkg", "--version");
    cmd = "yarn";
  } catch (e) {
    cmd = "npm";
  }

  return cmd;
}

module.exports = function initPkg() {
  const installCmd = getCmd();

  sh.exec(`${cmd} init -y`, { silent: true });
};
