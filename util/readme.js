const sh = require("shelljs");

module.exports = function generateReadme(proj) {
  const name = proj.replace(/^.*[\\\/]/, "");

  sh.exec(`echo '# ${name}\n' | cat - README.md > temp && mv temp README.md`),
    { silent: true };
};
