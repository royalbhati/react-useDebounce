import { useCallback, useRef } from "react";

export default (fn, delay = 0, event, promise = false) => {
  const ref = useRef({});
  ref.current.fn = fn;
  // ref.current.key = event.key;
  return useCallback(
    (...args) => {
      if (ref.current.timeout) {
        clearTimeout(ref.current.timeout);
      }
      if (promise) {
        ref.current.promise = new Promise((resolve, reject) => {
          ref.current.resolve = resolve;
          ref.current.reject = reject;
        });
      }
      ref.current.timeout = setTimeout(async () => {
        ref.current.timeout = undefined;
        const checkValueLength = () => args[0].value.length > 4;
        try {
          //If backspace logic required add < && ref.current.key !== "Backspace" >  below
          if (checkValueLength() && !promise) {
            const response = ref.current.fn(...args);
            ref.current.response = response;
          } else if (promise && checkValueLength()) {
            const response = await ref.current.fn(...args);
            ref.current.resolve(response);
          }
        } catch (err) {
          if (!promise && checklatest()) {
            throw new Error(err);
          } else if (promise && checklatest()) {
            ref.current.reject(err);
          }
        }
      }, delay);
      return promise ? ref.current.promise : ref.current.response;
    },
    [delay]
  );
};
