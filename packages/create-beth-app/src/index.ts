#!/usr/bin/env bun
import sh from "shelljs";
import { colors } from "./colors.js";
import { program } from "./commander.js";

export const main = () => {
  try {
    console.log(colors.info("\nStarting..."));
    console.log(colors.info("Running Pre-checks..."));

    // Read params from cli
    program.parse(process.argv);

    const options = program.opts();

    if (!options.projectName) {
      console.log(
        colors.error(
          'Error: No Project Name specified. Please include "--project-name <project-name>"',
        ),
      );

      sh.exit(0);
    }

    console.log(
      colors.warning(
        `Creating new beth-stack site at ./${options.projectName}`,
      ),
    );

    Bun.spawnSync(
      [
        "git",
        "clone",
        "https://github.com/ethanniser/beth-big.git",
        options.projectName,
      ],
      {
        onExit(subprocess, exitCode, signalCode, error) {
          if (exitCode !== 0) {
            console.log(colors.error(error));
            sh.exit(0);
          }
        },
      },
    );

    sh.cd(options.projectName);

    // Replace all instances of template name with new project name
    sh.ls("package.json").forEach((file: string) => {
      sh.sed("-i", '"test"', `"${options.projectName}"`, file);
    });

    // Remove the .git folder
    sh.exec(`rm -rf .git`);

    Bun.spawnSync(["bun", "install"], {
      onExit(subprocess, exitCode, signalCode, error) {
        if (exitCode !== 0) {
          console.log(colors.error(error));
          sh.exit(0);
        }
      },
    });

    // Print our done message
    console.log(colors.info.bold("Complete! 🎉"));
  } catch (error) {
    console.error(
      colors.error(
        `Uh oh - Something happened, please create an issue here: \n\nhttps://github.com/lundjrl/repo-cli`,
      ),
    );
  } finally {
    console.log(
      "this cli is extremely new and barebones, contributions are welcome",
    );
    console.log("https://github.com/ethanniser/the-beth-stack");
    console.log("looking for help? open an issue or ask in the discord");
    console.log("Ethan's Discord: https://discord.gg/Z3yUtMfkwa");
  }
};

main();
