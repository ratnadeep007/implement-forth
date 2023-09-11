import * as readline from "readline/promises";

enum OpCode {
  ADD = "+",
  SUB = "-",
  MUL = "*",
  DIV = "/",
  POP = ".",
  S = "S",
  EXIT = "EXIT"
}

class Forth {
  private stack: number[] = [];
  private rl: readline.Interface;
  private twoNumbers: number[] = [];
  private lineCount = 0;

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
      const answer = await this.rl.question(`(${this.lineCount}) > `);
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
      this.execute(value.toString());
    }
    this.lineCount++;
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
    } else if (OpCode.S === value) {
      console.log(this.stack.join(" ") + " ok");
    }
  }

  private setTwoNumbers() {
    this.twoNumbers[0] = this.stack[this.stack.length - 2];
    this.twoNumbers[1] = this.stack[this.stack.length - 1];
    this.stack.pop();
    this.stack.pop();
  }

  private add() {
    this.setTwoNumbers();
    this.push(this.twoNumbers[0] + this.twoNumbers[1]);
  }

  private sub() {
    this.setTwoNumbers();
    this.push(this.twoNumbers[0] - this.twoNumbers[1]);
  }

  private mul() {
    this.setTwoNumbers();
    this.push(this.twoNumbers[0] * this.twoNumbers[1]);
  }

  private div() {
    this.setTwoNumbers();
    this.push(this.twoNumbers[0] / this.twoNumbers[1]);
  }

  private pop() {
    console.log(this.stack.pop() + " ok");
  }
}

function main() {
  const forth = new Forth();
  forth.start();
}

main();
