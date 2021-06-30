import {useCallback, useEffect, useRef} from "react";
import {bufferTime, filter} from "rxjs/operators";
import {Observable} from "rxjs";

function useObservable(callback) {
  const memoCallback = useCallback(callback, []);
  const subscriberRef = useRef(null);
  useEffect(() => {
    const observable = new Observable(subscriber => {
      console.log('observable created', subscriber)
      subscriberRef.current = subscriber;
    });
    const observation = observable
      .pipe(bufferTime(100), filter(noEmptyArray))
      .subscribe((e) => {
        console.log('observe', e);
        memoCallback(e);
      });

    return () => {
      observation.unsubscribe();
    };
  }, []);

  return subscriberRef;
}
