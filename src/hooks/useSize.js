import useResizeObserver from "@react-hook/resize-observer";
import React, {useRef} from "react";

export const useSize = (target, callback, {checkWidth = true, checkHeight = true, decimalPoint = 0} = {}) => {
  const global = useRef({}).current;

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    const size = entry.contentRect;

    if (size.width !== undefined && size.height !== undefined) {
      const mul = Math.pow(10, decimalPoint);

      const newWidth = Math.trunc(size.width * mul) / mul;
      const newHeight = Math.trunc(size.height * mul) / mul;

      if ((checkHeight && newHeight !== global.height)
        || (checkWidth && newWidth !== global.width)) {
        global.width = newWidth;
        global.height = newHeight;
        if (callback) callback(size);
        global.size = size;
      }
    }
  });
  return global.size;
}
