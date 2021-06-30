import {useEffect, useState, useRef, useCallback} from 'react';

function isZoomGesture(e) {
  return e?.touches?.length === 2;
}

function getGestureDist(e) {
  const deltaX = e.touches[0].screenX - e.touches[1].screenX;
  const deltaY = e.touches[0].screenY - e.touches[1].screenY;
  const dis = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return dis;
}

export const useHandleZoom = (ref, onScroll, onZoom, onZoomEnd) => {

  const global = useRef({}).current;
  useEffect(() => {
    const node = ref && ref.current;
    if (node) {
      function handleMouseDown(e) {
        if (isZoomGesture(e)) {
          global.zooming = true;
          global.startD = getGestureDist(e);
          console.log('start');
          e.preventDefault();
        } else {
          global.zooming = false;
        }
      }

      function handleMouseUp(e) {
        if (global.zooming) {
          console.log('end');
          onZoomEnd();
        }
        global.zooming = false;
      }

      function handleMouseMove(e) {
        if (global.zooming && isZoomGesture(e)) {
          onZoom(getGestureDist(e) / global.startD);
          e.preventDefault();
        }
      }

      node.addEventListener('mousewheel', onScroll);
      node.addEventListener('touchstart', handleMouseDown);
      node.addEventListener('touchend', handleMouseUp);
      node.addEventListener('touchmove', handleMouseMove);
      return () => {
        node.removeEventListener('mousewheel', onScroll);
        node.removeEventListener('touchstart', handleMouseDown);
        node.removeEventListener('touchend', handleMouseUp);
        node.removeEventListener('touchmove', handleMouseMove);
      };
    }
  }, [ref?.current]);
};
