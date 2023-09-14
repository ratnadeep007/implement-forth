import * as readline from "readline/promises";
import { isNumber } from "./utils.ts";
import { type } from "os";

enum OpCode {
  ADD = "+",
  SUB = "-",
  MUL = "*",
  DIV = "/",
  POP = ".",
  S = "S",
  EXIT = "EXIT"
}

enum TokenType {
  NUMBER = "NUMBER",
  OPERATOR = "OPERATOR",
  NULL = "NULL"
}

class Token {
  type: TokenType;
  value: number | string;

  constructor(type: TokenType, value: number | string) {
    this.type = type;
    this.value = value;
  }
}

export class Forth {
  private stack: Token[] = [];
  private rl: readline.Interface;
  private twoNumbers: Token[] = [];
  private lineCount = 0;

  constructor() {
    this.stack = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  start(value?: string) {
    if (!value && value?.length !== 0) {
      console.log("TFORTH - Typescript Forth");
      console.log("Forth Language implemented in Typescript");
    }
    this.walk(value ?? "");
  }

  private walk(values: string) {
    for (const value of values) {
      if (value !== " ") {
        if (value.charCodeAt(0) === 10) {
          this.execute();
        } else if (isNumber(value)) {
          this.push(Number(value));
        } else {
          this.push(value);
        }
      }
    }
    console.log(this.stack);
  }

  private print(token?: Token) {
    if (token) {
      console.log(token.value + " ok");
    } else {
      const output = this.stack.map(el => el.value + " ");
      console.log(output + "ok");
    }
  }

  private execute() {
    for (const token of this.stack) {
      if (token.type === TokenType.OPERATOR) {
        switch (token.value) {
          case OpCode.ADD:
            this.add();
            break;
          case OpCode.SUB:
            this.sub();
            break;
          case OpCode.MUL:
            this.mul();
            break;
          case OpCode.DIV:
            this.div();
            break;
          case OpCode.POP:
            this.pop();
            break;
          case OpCode.S:
            this.print();
            break;

        }
      }
    }
  }

  private push(value: number | string) {
    if (typeof value === "number") {
      this.stack.push(new Token(TokenType.NUMBER, value));
    } else {
      switch (value) {
        case OpCode.ADD:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.ADD));
          break;
        case OpCode.SUB:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.SUB));
          break;
        case OpCode.MUL:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.MUL));
          break;
        case OpCode.DIV:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.DIV));
          break;
        case OpCode.POP:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.POP));
          break;
        case OpCode.S:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.S));
          break;
        case OpCode.EXIT:
          this.stack.push(new Token(TokenType.OPERATOR, OpCode.EXIT));
          break;
      }
    }
  }

  private setTwoNumbers() {
    if (this.stack.length > 2) {
      const revStack = this.stack;
      revStack.reverse();
      for (const tok of revStack) {
        if (tok.type === TokenType.NUMBER) {
          this.twoNumbers.push(tok);
        }
        if (this.twoNumbers.length === 2) {
          break;
        }
      }
    }
  }

  private add() {
    this.setTwoNumbers();
    console.log(this.twoNumbers);
    if (this.twoNumbers[0].value === TokenType.NUMBER && this.twoNumbers[1].value === TokenType.NUMBER) {
      this.push(Number(this.twoNumbers[0].value) + Number(this.twoNumbers[1].value));
    }
  }

  private sub() {
    this.setTwoNumbers();
    if (this.twoNumbers[0].value === TokenType.NUMBER && this.twoNumbers[1].value === TokenType.NUMBER) {
      this.push(Number(this.twoNumbers[0].value) - Number(this.twoNumbers[1].value));
    }
  }

  private mul() {
    this.setTwoNumbers();
    if (this.twoNumbers[0].value === TokenType.NUMBER && this.twoNumbers[1].value === TokenType.NUMBER) {
      this.push(Number(this.twoNumbers[0].value) * Number(this.twoNumbers[1].value));
    }
  }

  private div() {
    this.setTwoNumbers();
    if (this.twoNumbers[0].value === TokenType.NUMBER && this.twoNumbers[1].value === TokenType.NUMBER) {
      this.push(Number(this.twoNumbers[0].value) / Number(this.twoNumbers[1].value));
    }
  }

  private pop() {
    this.print(this.stack.pop());
  }
}
