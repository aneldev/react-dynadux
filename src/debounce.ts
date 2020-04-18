export const debounce = (func: (...args: any[]) => any, debounceMs: number) => {
  let lastCalled = 0;
  let timer: any = 0;
  let blocked = false;
  let lastArgs: any[] = [];

  return (...args: any[]): any => {
    const now = Date.now();

    if (timer === 0) {

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
