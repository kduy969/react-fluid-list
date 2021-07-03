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

export const useMouseZoom = (onScroll, onZoomStart, onZoom, onZoomEnd) => {
  const global = useRef({}).current;

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
      onZoom(scale, getOffsetToCenter(getGestureCenter(e), global.node));
      e.preventDefault();
    }
  }

  function handleMouseScroll(e) {
    //coordinate in node
    onScroll({
      deltaX: e.deltaX,
      deltaY: e.deltaY,
    }, getOffsetToCenter(getPoint(e), global.node))
  }

  function setUp(node) {
    global.node = node;
    if (!global.node) return;
    node.addEventListener('mousewheel', handleMouseScroll);
    node.addEventListener('touchstart', handleMouseDown);
    node.addEventListener('touchend', handleMouseUp);
    node.addEventListener('touchmove', handleMouseMove);
  }

  function cleanUp() {
    if (!global.node) return;
    global.node.removeEventListener('mousewheel', handleMouseScroll);
    global.node.removeEventListener('touchstart', handleMouseDown);
    global.node.removeEventListener('touchend', handleMouseUp);
    global.node.removeEventListener('touchmove', handleMouseMove);
    global.node = null;
    global.zooming = false;
  }

  function onNodeChange(newNode) {
    if (newNode !== global.node) {
      cleanUp();
      setUp(newNode);
    }
  };

  // return onRefChange callback, user component must call it when element ref change.
  return onNodeChange;
};
