import { Evaluator } from './Evaluator';

describe('Evaluator', () => {
  let evaluator: Evaluator;
  beforeEach(() => {
    evaluator = new Evaluator();
  });

  it('should evaluate expression without priorities', () => {
    expect(evaluator.evaluate('1 - 2 + 3')).toBe(2);
  });

  it('should evaluate expression with priorities', () => {
    expect(evaluator.evaluate('1 - 2 * 3 / 2 ^ 2')).toBe(-0.5);
  });

  it('should evaluate expression with parenthesis', () => {
    expect(evaluator.evaluate('(1 - 2) * 3')).toBe(-3);
  });
});
