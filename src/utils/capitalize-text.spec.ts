import { capitalizeText } from './capitalize-text';

describe('capitalizeText', () => {
  it('should capitalize the first letter of each word', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello World';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });

  it('should handle hyphenated words correctly', () => {
    const input = 'hello-world';
    const expectedOutput = 'Hello-World';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });

  it('should handle words separated by commas', () => {
    const input = 'hello,world';
    const expectedOutput = 'Hello,World';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });

  it('should handle mixed spaces, hyphens, and commas correctly', () => {
    const input = 'hello world-goodbye,moon';
    const expectedOutput = 'Hello World-Goodbye,Moon';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });

  it('should return an empty string when input is an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });

  it('should capitalize single words', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';
    expect(capitalizeText(input)).toBe(expectedOutput);
  });
});
