// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
jest.mock('lodash');
import { random } from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(150, account)).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const toAccount = getBankAccount(0);
    account.transfer(50, toAccount);
    expect(account.getBalance()).toBe(50);
    expect(toAccount.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 50;
    (random as jest.Mock).mockReturnValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    async () => {
      (random as jest.Mock).mockReturnValueOnce(0);
      await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
    };
  });
});
