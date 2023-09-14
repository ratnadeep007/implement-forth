import { Forth } from "./lib/forth.ts";

function main() {
  const forth = new Forth();
  forth.start();
}

const args = process.argv;

if (args.length > 2) {
  for (const arg of args) {
    if (arg.includes(".forth")) {
      const forth = new Forth();
      const file = Bun.file(arg);
      const contents = await file.text();
      forth.start(contents);
    }
  }
  process.exit(0);
} else {
  main();
}
