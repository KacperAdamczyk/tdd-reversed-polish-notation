enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  PAREN_OPEN = '(',
  PAREN_CLOSE = ')',
  POWER = '^',
}

const GROUP_REGEX = /\d+|[+-/*/()^]/g;

type Item = number | Operator;

function isNumber(item: Item): item is number {
  return Number.isFinite(item);
}

export class Evaluator {
  evaluate(expression: string): number {
    const groupedExpression: Item[] = expression
      .match(GROUP_REGEX)
      .map((item) => {
        if (!Number.isNaN(+item)) {
          return +item;
        }

        if ((Object.values(Operator) as string[]).includes(item)) {
          return item as Operator;
        }
      });

    const postfix: Item[] = [];
    const operators: Operator[] = [];
    groupedExpression.forEach((item) => {
      if (isNumber(item)) {
        return postfix.push(item);
      }

      while (operators.length) {
        const lastOperator = operators[operators.length - 1];

        if (
          this.getOperatorPriority(item) <=
          this.getOperatorPriority(lastOperator)
        ) {
          postfix.push(operators.pop());
          continue;
        }

        break;
      }

      operators.push(item);
    });

    while (operators.length) {
      postfix.push(operators.pop());
    }

    const numbers: number[] = [];
    postfix.forEach((item) => {
      if (isNumber(item)) {
        return numbers.push(item);
      }

      const a: number = numbers.pop();
      const b: number = numbers.pop();

      if (item === Operator.ADD) {
        return numbers.push(b + a);
      }
      if (item === Operator.SUBTRACT) {
        return numbers.push(b - a);
      }
      if (item === Operator.MULTIPLY) {
        return numbers.push(b * a);
      }
      if (item === Operator.DIVIDE) {
        return numbers.push(b / a);
      }
      if (item === Operator.POWER) {
        return numbers.push(b ** a);
      }
    });

    return numbers.pop();
  }

  getOperatorPriority(operator: Operator) {
    switch (operator) {
      case Operator.PAREN_OPEN:
        return 0;
      case Operator.ADD:
      case Operator.SUBTRACT:
      case Operator.PAREN_CLOSE:
        return 1;
      case Operator.MULTIPLY:
      case Operator.DIVIDE:
        return 2;
      case Operator.POWER:
        return 3;
    }
  }
}
