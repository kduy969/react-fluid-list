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

export function useMouseDrag(ref, {onDrag, onDrop}) {
  const global = useRef({}).current;
  useLayoutEffect(() => {
    const element = ref?.current;
    console.log('Set up mouse drag', element);
    if (element) {
      function handleMouseDown(e) {
        global.startP = getPoint(e);
        global.dragging = true;
        global.currentP = getPoint(e);
      }

      function handleMouseUp(e) {
        if (global.dragging) {
          onDrop?.(getOffset(global.startP, getPoint(e)));
        }
        global.dragging = false;
      }

      function handleMouseMove(e) {
        if (global.dragging) {
          onDrag(
            getOffset(global.currentP, getPoint(e)),
            getOffset(global.startP, getPoint(e)),
          );
          global.currentP = getPoint(e);
        }
        e.preventDefault();
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
