import {useCallback, useEffect, useRef} from "react";
import {Observable} from "rxjs";

export function usePipeCallback(output, deps = [], pipes) {
  const memoOutput = useCallback(output, deps);
  const subsRef = useRef(null);
  const memoInput = useCallback((...args) => {
    subsRef.current?.next?.(...args);
  }, []);
  useEffect(() => {
    const observable = new Observable(subscriber => {
      subsRef.current = subscriber;
    });
    const observation = observable
      .pipe(...pipes)
      .subscribe(memoOutput);

    return () => {
      observation.unsubscribe();
    };
  }, []);

  return memoInput;
}
