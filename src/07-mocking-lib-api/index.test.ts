// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.runOnlyPendingTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts/1');
    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/posts/1');
    expect(get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const expectedData = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const data = await throttledGetDataFromApi('/posts/1');
    expect(data).toStrictEqual(expectedData);
  });
});
