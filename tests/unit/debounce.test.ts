import "jest";
import { debounce } from "../../src/debounce";

const delay = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

describe('Debounce', () => {
  test('No debounce when is 0', async (done) => {
    let counter = 0;
    let addCounter = (): number => counter += 1;
    const testCount = 50;
    const timeout = 5;
    addCounter = debounce(addCounter, timeout);

    Array(testCount).fill(null).forEach((v, index) => {
      setTimeout(addCounter, index * timeout * 10);
    });

    await delay((testCount * timeout * 10) + 100);
    expect(counter).toBe(testCount);
    done();
  });

  test('It debounce when is needed', async (done) => {
    let counter = 0;
    let addCounter = (value: number): number => counter += value;
    addCounter = debounce(addCounter, 100);

    addCounter(1);
    await delay(120);
    addCounter(1);

    expect(counter).toBe(2);
    done();

  });

  test('It debounces', async (done) => {
    let counter = 0;
    let addCounter = (value: number): number => counter += value;
    addCounter = debounce(addCounter, 100);

    addCounter(2);
    addCounter(3);
    addCounter(4);
    await delay(120);
    addCounter(5);

    expect(counter).toBe(2 + 4 + 5);
    done();

  });

  test('It debounces in an row', async (done) => {
    let counter = 0;
    let addCounter = (value: number): number => counter += value;
    addCounter = debounce(addCounter, 100);

    addCounter(2);
    addCounter(3);
    addCounter(4);
    await delay(110);
    addCounter(5);
    addCounter(6);
    addCounter(7);
    await delay(110);

    expect(counter).toBe(2 + 4 + 5 + 7);
    done();

  });
});
