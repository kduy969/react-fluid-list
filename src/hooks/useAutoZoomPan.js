import {useMouseZoom} from "./useMouseZoom";
import {useRef} from "react";
import {useThrottle} from "./useThrottle";
import {useMouseDrag} from "./useMouseDrag";

// track event and apply to target node
export function useAutoZoomPan(targetRef, {throttle = 30, minZoom = 0.2, maxZoom = 10, zoomPerScrollPixel = 0.002} = {}) {
  const global = useRef({
    translateX: 0,
    translateY: 0,
    scale: 1,
    scaleMul: 1,
    zooming: false,
  }).current;

  const updateThrottled = useThrottle(
    (scale) => {
      targetRef.current.style.transform = `scale(${global.scale * global.scaleMul})`
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
    const adjustX = (offsetX - offsetAfterScale.x) / Math.sqrt(scaleAdjust); //
    const adjustY = (offsetY - offsetAfterScale.y) / Math.sqrt(scaleAdjust);
    //console.log(adjustX, offsetX, scaleAdjust, 1 / scaleAdjust);

    const currentScaleLevel = (global.scale * global.scaleMul);
    global.translateX += adjustX / currentScaleLevel;
    global.translateY += adjustY / currentScaleLevel;
  }

  const setUpMouseZoom = useMouseZoom(
    ({deltaY}, zoomPointOffset) => {
      if (deltaY === 0) return;

      let newScale = global.scale + deltaY * -zoomPerScrollPixel * Math.sqrt(global.scale);
      newScale = Math.max(newScale, minZoom);
      newScale = Math.min(newScale, maxZoom);

      const scaleAdjust = newScale / global.scale;
      translateTowardZoomPoint(zoomPointOffset, scaleAdjust)
      global.scale = newScale;
      updateThrottled();
    },
    (e) => {
      global.zooming = true;
    },
    (scale, zoomPointOffset) => {
      const scaleAdjust = scale / global.scaleMul;
      translateTowardZoomPoint(zoomPointOffset, scaleAdjust);
      global.scaleMul = scale;
      updateThrottled();
    },
    (scale) => {
      global.scale = global.scale * global.scaleMul;
      global.scaleMul = 1;
      global.zooming = false;
    });

  const setUpMouseDrag = useMouseDrag(
    {
      onDrag: ({offsetX, offsetY}) => {
        if (!global.zooming) {
          // zoom and pan effect apply on same element -> need to scale pan offset base current zoom level
          const currentScaleLevel = (global.scale * global.scaleMul);
          global.translateX -= offsetX / currentScaleLevel;
          global.translateY -= offsetY / currentScaleLevel;
          updateThrottled();
        }
      }
    });

  return {setUpMouseDrag, setUpMouseZoom};
}
