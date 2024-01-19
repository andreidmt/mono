import fs from "node:fs";
import path from "node:path";

export default (plop) => {
  // Source path for scaffolds
  const scaffoldsPath = "packages/@scaffolds";
  const scaffolds = fs
    .readdirSync(scaffoldsPath)
    .filter((fileName) =>
      fs.statSync(path.join(scaffoldsPath, fileName)).isDirectory(),
    );

  // Destination path for new packages
  const packagesPath = "packages";
  const namespaces = fs
    .readdirSync(packagesPath)
    .filter(
      (fileName) =>
        fileName.startsWith("@") &&
        fs.statSync(path.join(packagesPath, fileName)).isDirectory(),
    );

  // Create plop generators for each scaffold
  scaffolds.forEach((scaffold) => {
    plop.setGenerator(scaffold, {
      prompts: [
        {
          type: "input",
          name: "name",
          message: "What is the name of the new package?",
        },
        {
          type: "list",
          name: "domain",
          message: "Which domain should this package be placed in?",
          choices: namespaces,
        },
      ],
      actions: function (data) {
        const sourcePath = `${scaffoldsPath}/${scaffold}/`;
        const destPath = `${packagesPath}/${data.domain}/{{kebabCase name}}/`;

        return [
          {
            type: "addMany",
            destination: destPath,
            base: sourcePath,
            templateFiles: [sourcePath + "**", sourcePath + "**/.*"],
          },
        ];
      },
    });
  });
};
