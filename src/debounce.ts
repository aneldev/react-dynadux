import {dynaDebounce} from "dyna-debounce";

export const debounce = (func: (...args: any[]) => void, timeout: undefined | number): () => void => {
  if (timeout === undefined) return func;
  return dynaDebounce(func, timeout, {
    leading: true,
    maxWait: timeout,
  });
};
