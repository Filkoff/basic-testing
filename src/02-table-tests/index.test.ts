// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 27, b: 3, action: Action.Divide, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 8, b: 5, action: Action.Multiply, expected: 40 },
  { a: 23, b: 2, action: Action.Subtract, expected: 21 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
];

describe('simpleCalculator test', () => {
  test.each(testCases)('return correct result', (input) => {
    const result = simpleCalculator(input);
    expect(result).toEqual(input.expected);
  });
});
