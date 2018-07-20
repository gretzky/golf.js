#!/usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const golf = require("./lib/golf");
const man = require("./lib/man");
const pkg = require("./package.json");

let projectName;

program
  .version(pkg.version)
  .arguments("<project-directory>")
  .usage(`${chalk.blue("<project-name>")}`)
  .action(name => {
    projectName = name;
  })
  .on("--help, -h", man)
  .parse(process.argv);

golf(projectName);
