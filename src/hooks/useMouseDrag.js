import {useState, useLayoutEffect, useRef, useCallback, useEffect} from 'react';
import {useCallbackRef, useRefToCallback} from "use-callback-ref";

function getOffset(startP, endP) {
  return {
    offsetX: startP.x - endP.x,
    offsetY: startP.y - endP.y,
  }
}


function getPoint(e) {
  var touch = e?.touches?.[0];
  return {
    x: e.clientX || e.pageX || touch?.clientX || touch?.screenX,
    y: e.clientY || e.pageY || touch?.clientY || touch?.screenY,
  };
}

export function useMouseDrag({onDrag, onDrop}) {
  const global = useRef({}).current;

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
    if (e.buttons === 0) {
      global.dragging = false;
      return;
    }
    if (global.dragging) {
      onDrag(
        getOffset(global.currentP, getPoint(e)),
        getOffset(global.startP, getPoint(e)),
      );
      global.currentP = getPoint(e);
    }
    e.preventDefault();
  }

  function setUp(node) {
    global.node = node;
    if (!global?.node) return;

    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('mouseup', handleMouseUp);
    node.addEventListener('mousemove', handleMouseMove);

    node.addEventListener('touchstart', handleMouseDown);
    node.addEventListener('touchend', handleMouseUp);
    node.addEventListener('touchmove', handleMouseMove);
  }

  function cleanUp(node) {
    if (!global.node) return;
    global.node.removeEventListener('mousedown', handleMouseDown);
    global.node.removeEventListener('mouseup', handleMouseUp);
    global.node.removeEventListener('mousemove', handleMouseMove);

    global.node.removeEventListener('touchstart', handleMouseDown);
    global.node.removeEventListener('touchend', handleMouseUp);
    global.node.removeEventListener('touchmove', handleMouseMove);
    global.node = null;
    global.dragging = false;
  }

  function onNodeChange(newNode) {
    if (newNode !== global.node) {
      cleanUp(global.node);
      setUp(newNode);
    }
  }

  // return onRefChange callback, user component must call it when element ref change.
  return onNodeChange;
}
