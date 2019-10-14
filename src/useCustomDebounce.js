import { useCallback, useRef } from "react";
import "@babel/polyfill";
export default (
  fn,
  delay = 0,
  promise,
  dontFireOnbackspace,
  lengthConstraint,
  event
) => {
  const ref = useRef({});
  ref.current.fn = fn;
  ref.current.key = event.key;
  ref.current.lengthConstraint = lengthConstraint;
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

        const checkValueLength = () => {
          if (lengthConstraint) {
            return args[0].length > lengthConstraint;
          } else {
            return true;
          }
        };
        const checkKey = () => {
          if (dontFireOnbackspace) {
            if (ref.current.key === "Backspace") {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        };
        try {
          if (!promise && checkValueLength() && checkKey()) {
            const response = ref.current.fn(...args);
            ref.current.response = response;
          } else if (promise && checkValueLength() && checkKey()) {
            const response = await ref.current.fn(...args);
            ref.current.resolve(response);
          }
        } catch (err) {
          if (!promise && checkValueLength()) {
            throw new Error(err);
          } else if (promise && checkValueLength()) {
            ref.current.reject(err);
          }
        }
      }, delay);
      return promise ? ref.current.promise : ref.current.response;
    },
    [delay]
  );
};
