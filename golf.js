#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const generateLicense = require("./util/license");
const generateGitignore = require("./util/gitignore");
const generateReadme = require("./util/readme.js");
const initPkg = require("./util/initPkg");

function golf(projectName) {
  const spinner = ora(`Creating ${projectName}...`);

  if (fs.existsSync(projectName)) {
    spinner.stopAndPersist({
      symbol: "🚫 ",
      text: `${chalk.red(`${projectName} already exists. Try again`)}`
    });
    process.exit(1);
  }

  spinner.text = `Adding files for ${projectName}`;

  const projectPath = (projectName = process.cwd() + "/" + projectName);
  const templatePath = path.resolve(__dirname, "./lib");

  // TODO this transforms into a full path somewhere...
  const projName = projectName.replace(/^.*[\\\/]/, "");

  spinner.start();

  return new Promise((resolve, reject) => {
    fs.copy(templatePath, projectPath)
      .then(function() {
        process.chdir(projectPath);

        generateGitignore();
        generateLicense();
        generateReadme(projectName);

        initPkg();
      })
      .then(function() {
        resolve();
        spinner.stopAndPersist({
          symbol: "✨ ",
          text: `${chalk.magenta(`Done!`)}`
        });
        console.log(chalk.cyan(`cd ${projName} and get programming`));
      })
      .catch(function(err) {
        spinner.stopAndPersist({
          symbol: "🚫 ",
          text: `${chalk.red(`An error occured:\n${err}`)}`
        });
        reject(err);
        process.exit(1);
      });
  });
}

golf("poop");
