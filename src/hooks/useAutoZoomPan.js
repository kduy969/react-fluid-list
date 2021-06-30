import {usePipe, usePipeCallback} from "./usePipe";
import {bufferTime, filter, throttleTime, map, pluck, reduce} from "rxjs/operators";
import {useMouseScroll} from "./useMouseScroll";
import {useRef} from "react";
import {useThrottle} from "./useThrottle";
import {useMouseDrag} from "./useMouseDrag";

function noEmptyArray(items) {
  return !!items.length;
}

function sum(total, item) {
  return total + item;
}

// track event from track node and apply to target node
export function useAutoZoomPan(trackRef, targetRef) {
  const global = useRef({
    translateX: 0,
    translateY: 0,
    scale: 1,
    adjustMultiply: 1,
    adjustAdd: 0,
  }).current;

  const updateThrottled = useThrottle(
    (scale) => {
      targetRef.current.style.transform = `scale(${global.scale * global.adjustMultiply})`
        + `translateX(${global.translateX}px)`
        + `translateY(${global.translateY}px)`;
    },
    30,
    [targetRef],
  );

  useMouseScroll(
    trackRef,
    ({deltaY}) => {
      if (deltaY === 0) return;
      global.scale += deltaY * -0.001;
      global.scale = Math.max(global.scale, 0.2);
      global.scale = Math.min(global.scale, 3);
      updateThrottled();
    },
    (scale) => {
      global.adjustMultiply = scale;
      targetRef.current.style.transform = `scale(${global.scale * global.adjustMultiply})`;
      updateThrottled();
    },
    (scale) => {
      global.scale = global.scale * global.adjustMultiply;
      global.adjustMultiply = 1;
    });

  useMouseDrag(
    trackRef,
    {
      onDrag: ({offsetX, offsetY}) => {
        console.log('drag');
        global.translateX -= offsetX;
        global.translateY -= offsetY;
        updateThrottled();
      }
    });
}
