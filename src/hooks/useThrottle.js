import {useCallback, useEffect, useRef, useMemo} from "react";
import {throttle} from "lodash";

export const useThrottle = (fnToThrottle, durationInMs = 200, deps = []) => {
  if (isNaN(durationInMs)) {
    throw new TypeError("durationInMs for debounce should be a number");
  }

  if (fnToThrottle == null) {
    throw new TypeError("fnToDebounce cannot be null");
  }

  if (typeof fnToThrottle !== "function") {
    throw new TypeError("fnToDebounce should be a function");
  }

  const callback = useCallback(
    fnToThrottle,
    [...deps]
  );


  const throttleMemo = useMemo(() => {
    console.log('Create throttle');
    return throttle(callback, durationInMs);
  }, [callback, durationInMs]);

  return throttleMemo;
};
