// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import { join } from 'path';
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    const spyTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spyTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const spyInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    expect(spyInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 2);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const mockFs = require('fs');
  const mockPromiseFs = require('fs/promises');

  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    mockFs.existsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Hello, World!';
    mockFs.existsSync.mockReturnValue(true);
    mockPromiseFs.readFile.mockResolvedValue(fileContent);

    const result = await readFileAsynchronously('./test.txt');

    expect(result).toBe(fileContent);
  });
});
