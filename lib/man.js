const chalk = require("chalk");

module.exports = function man() {
  return `
    ${chalk.blue(`golf <project-name>`)}

    see a weird bug? not working? complaints? comments?
    ${chalk.cyan(`http://github.com/gretzky/golf.js/issues/new`)}
  `;
};
