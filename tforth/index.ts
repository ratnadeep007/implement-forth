import * as readline from "readline/promises";

enum OpCode {
  ADD = "+",
  SUB = "-",
  MUL = "*",
  DIV = "/",
  POP = ".",
  EXIT = "EXIT"
}

class Forth {
  private stack: number[] = [];
  private rl: readline.Interface;
  private twoNumbers: number[] = [];

  constructor() {
    this.stack = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  start() {
    console.log("TFORTH - Typescript Forth");
    console.log("Forth Language implemented in Typescript");
    this.loop();
  }

  private async loop() {
    try {
      const answer = await this.rl.question("> ");
      this.validate(answer);
      this.loop();
    } catch (err) {
      console.error(err);
    }
  }

  private validate(value: string) {
    if (!isNaN(Number(value))) {
      this.push(Number(value));
    } else {
      console.log(value);
      this.execute(value.toString());
    }
  }

  private push(value: number) {
    this.stack.push(value);
  }

  private execute(value: string) {
    if (OpCode.ADD === value) {
      this.add();
    } else if (OpCode.SUB === value) {
      this.sub();
    } else if (OpCode.MUL === value) {
      this.mul();
    } else if (OpCode.DIV === value) {
      this.div();
    } else if (OpCode.POP === value) {
      this.pop();
    } else if (OpCode.EXIT === value) {
      process.exit(0);
    }
  }

  private add() {
    this.twoNumbers[0] = this.stack[this.stack.length - 2];
    this.twoNumbers[1] = this.stack[this.stack.length - 1];
    this.push(this.twoNumbers[0] + this.twoNumbers[1]);
  }

  private sub() {
    this.twoNumbers[0] = this.stack[this.stack.length - 2];
    this.twoNumbers[1] = this.stack[this.stack.length - 1];
    this.push(this.twoNumbers[0] - this.twoNumbers[1]);
  }

  private mul() {
    this.twoNumbers[0] = this.stack[this.stack.length - 2];
    this.twoNumbers[1] = this.stack[this.stack.length - 1];
    this.push(this.twoNumbers[0] * this.twoNumbers[1]);
  }

  private div() {
    this.twoNumbers[0] = this.stack[this.stack.length - 2];
    this.twoNumbers[1] = this.stack[this.stack.length - 1];
    this.push(this.twoNumbers[0] / this.twoNumbers[1]);
  }

  private pop() {
    console.log(this.stack.pop() + "ok");
  }
}

function main() {
  const forth = new Forth();
  forth.start();
}

main();
