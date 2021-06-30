import {usePipe, usePipeCallback} from "./usePipe";
import {useMouseZoom} from "./useMouseZoom";
import {useRef} from "react";
import {useThrottle} from "./useThrottle";
import {useMouseDrag} from "./useMouseDrag";

// track event from track node and apply to target node
export function useAutoZoomPan(trackRef, targetRef, {zoom = true, pan = true, throttle = 30} = {}) {
  const global = useRef({
    translateX: 0,
    translateY: 0,
    scale: 1,
    adjustMultiply: 1,
    adjustAdd: 0,
    zooming: false,
  }).current;

  const updateThrottled = useThrottle(
    (scale) => {
      targetRef.current.style.transform = `scale(${global.scale * global.adjustMultiply})`
        + `translateX(${global.translateX}px)`
        + `translateY(${global.translateY}px)`;
    },
    throttle,
    [],
  );

  function translateTowardZoomPoint({offsetX, offsetY}, scaleAdjust) {
    // translate toward zoom point
    // zoom point offset to center after scale
    const offsetAfterScale = {
      x: offsetX * scaleAdjust,
      y: offsetY * scaleAdjust
    };
    // translate back to maintain zoom point
    const adjustX = offsetX - offsetAfterScale.x;
    const adjustY = offsetY - offsetAfterScale.y;

    const currentScaleLevel = (global.scale * global.adjustMultiply);
    global.translateX += adjustX / currentScaleLevel;
    global.translateY += adjustY / currentScaleLevel;
  }

  useMouseZoom(
    zoom ? trackRef : null,
    ({deltaY}, zoomPointOffset) => {
      if (deltaY === 0) return;

      let newScale = global.scale + deltaY * -0.001;
      newScale = Math.max(newScale, 0.2);
      newScale = Math.min(newScale, 3);

      const scaleAdjust = newScale / global.scale;
      translateTowardZoomPoint(zoomPointOffset, scaleAdjust)
      global.scale = newScale;
      updateThrottled();
    },
    (e) => {
      global.zooming = true;
    },
    (scale, zoomPointOffset) => {
      const scaleAdjust = scale / global.adjustMultiply;
      translateTowardZoomPoint(zoomPointOffset, scaleAdjust);
      global.adjustMultiply = scale;
      updateThrottled();
    },
    (scale) => {
      global.scale = global.scale * global.adjustMultiply;
      global.adjustMultiply = 1;
      global.zooming = false;
    });

  useMouseDrag(
    pan ? trackRef : null,
    {
      onDrag: ({offsetX, offsetY}) => {
        if (!global.zooming) {
          // zoom and pan effect apply on same element -> need to scale pan offset base current zoom level
          const currentScaleLevel = (global.scale * global.adjustMultiply);
          global.translateX -= offsetX / currentScaleLevel;
          global.translateY -= offsetY / currentScaleLevel;
          updateThrottled();
        }
      }
    });
}
