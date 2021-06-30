import {useCallback, useEffect, useRef} from "react";
import {debounce} from "lodash";

export const useDebounce = (fnToDebounce, durationInMs = 200, deps = []) => {
  if (isNaN(durationInMs)) {
    throw new TypeError("durationInMs for debounce should be a number");
  }

  if (fnToDebounce == null) {
    throw new TypeError("fnToDebounce cannot be null");
  }

  if (typeof fnToDebounce !== "function") {
    throw new TypeError("fnToDebounce should be a function");
  }

  const callback = useCallback(
    fnToDebounce,
    [...deps]
  );

  const debounceRef = useRef(null);
  useEffect(() => {
    debounceRef.current = debounce(callback, durationInMs);
  }, [callback, durationInMs]);

  return debounceRef.current;
};
