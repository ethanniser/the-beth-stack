import { Command } from "commander";

export const program = new Command();

program
  .option("-h", "--help", "show how to use this tool")
  .option("-n", "--node", "use the node template")
  .option("-njs", "--nextjs", "use the nextjs template")
  .option("-rn", "--react-native", "use the react-native template")
  .option("-p --project-name <project-name>")
  .option("-b", "--bun", "run with bun")
  .option("-y", "--yarn", "run with yarn")
  .option("-npm", "--npm", "run with npm");
