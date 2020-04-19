export const debounce = (func: (...args: any[]) => void, debounceMs: undefined | number): () => void => {
  let lastCalled = 0;
  let timer: any = 0;
  let blocked = false;
  let lastArgs: any[] = [];

  return (...args: any[]): any => {
    if (debounceMs === undefined) {
      func(...lastArgs);
      return;
    }

    if (timer === 0) {
      const now = Date.now();
      timer = setTimeout(() => {
        lastCalled = now;
        timer = 0;
        if (blocked) {
          blocked = false;
          func(...lastArgs);
        }
      }, debounceMs);
      lastCalled = now;
      func(...args);
      return;
    }

    lastArgs = args;

    if (!blocked) {
      blocked = true;
    }
  };
};
