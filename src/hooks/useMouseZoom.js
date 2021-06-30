import {useEffect, useState, useRef, useCallback} from 'react';

function isZoomGesture(e) {
  return e?.touches?.length === 2;
}

function getGestureDist(e) {
  const deltaX = e.touches[0].clientX - e.touches[1].clientX;
  const deltaY = e.touches[0].clientY - e.touches[1].clientY;
  const dis = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  return dis;
}


function getGestureCenter(e) {
  return {
    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
    y: (e.touches[0].clientY + e.touches[1].clientY) / 2
  }
}

function getPoint(e) {
  var touch = e?.touches?.[0];
  return {
    x: e.clientX || e.pageX || touch.clientX,
    y: e.clientY || e.pageY || touch.clientY,
  };
}

function getCoordinateInNode(e, node) {
  const nodeP = {
    x: node.clientLeft,
    y: node.clientTop,
  };
  const eP = getPoint(e);
  const offset = getOffset(eP, nodeP);
  return {
    x: offset.offsetX,
    y: offset.offsetY,
  }
}

function getOffsetToCenter(point, node) {
  const center = {
    x: (node.clientLeft + node.clientWidth) / 2,
    y: (node.clientTop + node.clientHeight) / 2,
  };
  return getOffset(point, center);
}


function getOffset(startP, endP) {
  return {
    offsetX: startP.x - endP.x,
    offsetY: startP.y - endP.y,
  }
}

export const useMouseZoom = (ref, onScroll, onZoomStart, onZoom, onZoomEnd) => {
  const global = useRef({}).current;
  useEffect(() => {
    const node = ref && ref.current;
    if (node) {
      function handleMouseDown(e) {
        if (isZoomGesture(e)) {
          global.zooming = true;
          global.startD = getGestureDist(e);
          onZoomStart(e);
          e.preventDefault();
        } else {
          global.zooming = false;
        }
      }

      function handleMouseUp(e) {
        if (global.zooming) {
          onZoomEnd();
        }
        global.zooming = false;
      }

      function handleMouseMove(e) {
        if (global.zooming && isZoomGesture(e)) {
          const scale = getGestureDist(e) / global.startD;
          onZoom(scale, getOffsetToCenter(getGestureCenter(e), node));
          e.preventDefault();
        }
      }

      function handleMouseScroll(e) {
        //coordinate in node
        onScroll({
          deltaX: e.deltaX,
          deltaY: e.deltaY,
        }, getOffsetToCenter(getPoint(e), node))
      }

      node.addEventListener('mousewheel', handleMouseScroll);
      node.addEventListener('touchstart', handleMouseDown);
      node.addEventListener('touchend', handleMouseUp);
      node.addEventListener('touchmove', handleMouseMove);
      return () => {
        node.removeEventListener('mousewheel', handleMouseScroll);
        node.removeEventListener('touchstart', handleMouseDown);
        node.removeEventListener('touchend', handleMouseUp);
        node.removeEventListener('touchmove', handleMouseMove);
      };
    }
  }, [ref?.current]);
};
