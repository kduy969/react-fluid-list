
import {useState, useLayoutEffect, useRef, useCallback} from 'react';

function getOffset(startP, endP) {
  return {
    offsetX: startP.x - endP.x,
    offsetY: startP.y - endP.y,
  }
}


function getPoint(e) {
  var touch = e?.touches?.[0];
  return {
    x: e.clientX || e.pageX || touch.screenX,
    y: e.clientY || e.pageY || touch.screenY,
  };
}

export function useMouseEvent(ref, {onDrag, onDrop}) {
  const global = useRef({}).current;
  useLayoutEffect(() => {
    const element = ref?.current;
    console.log('Set up mouse drag', element);
    if (element) {
      function handleMouseDown(e) {

      }

      function handleMouseUp(e) {

      }

      function handleMouseMove(e) {

      }

      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mousemove', handleMouseMove);

      element.addEventListener('touchstart', handleMouseDown);
      element.addEventListener('touchend', handleMouseUp);
      element.addEventListener('touchmove', handleMouseMove);

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mousemove', handleMouseMove);

        element.removeEventListener('touchstart', handleMouseDown);
        element.removeEventListener('touchend', handleMouseUp);
        element.removeEventListener('touchmove', handleMouseMove);
      };
    }
  }, [ref?.current]);
}
