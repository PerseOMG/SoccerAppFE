const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const projectsPath = path.resolve(__dirname, "../");

const questions = [
  {
    type: "rawlist",
    name: "update",
    message: "Is it a Major (2.0.0), Minor (1.1.0), or Patch (1.1.1) update?",
    choices: ["major", "minor", "patch"],
  },
];

console.log(`Please answer the following to update a library.`);

inquirer.prompt(questions).then((answers) => {
  const currentPackageJson = require(`${projectsPath}/package.json`);
  const currentVersion = {
    major: +currentPackageJson.version.split(".")[0],
    minor: +currentPackageJson.version.split(".")[1],
    patch: +currentPackageJson.version.split(".")[2],
  };

  const updateVersion = (currentVer, updateType) => {
    switch (updateType) {
      case "major":
        return `${++currentVer.major}.0.0`;
      case "minor":
        return `${currentVer.major}.${++currentVer.minor}.0`;
      case "patch":
        return `${currentVer.major}.${currentVer.minor}.${++currentVer.patch}`;
    }
  };
  const newVersion = updateVersion(currentVersion, answers.update);

  const updatedPackageJson = {
    ...currentPackageJson,
    version: newVersion,
  };

  // Build version const for mtb
  if (answers.library === "mtb") {
    const constsPath = path.resolve(
      __dirname,
      "../projects/mtb/src/lib/constants"
    );
    const fileName = "mtb-library.consts.ts";
    const value = `export default { version: "${newVersion}" }`;
    fs.writeFileSync(
      `${constsPath}/${fileName}`,
      `${JSON.parse(JSON.stringify(value, null, 2))}`
    );
  }

  console.log("The following answers were provided:\n");
  console.log(JSON.stringify(answers, null, "  "));
  console.log(`Overwriting file at: ./projects/package.json`);
  console.log(
    `Updating with a ${answers.update} version update with a new version of ${newVersion}`
  );
  fs.writeFileSync(
    `${projectsPath}/package.json`,
    `${JSON.stringify(updatedPackageJson, null, 2)}\n`
  );
  console.log("Package.json updated.");
  console.log(
    "All files have been written. Devops process will no begin and the library will be published."
  );
});
