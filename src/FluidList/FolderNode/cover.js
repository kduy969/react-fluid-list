import React, {useRef} from "react";
import css from "./FolderNode.module.css";
import {calcFont} from "../helper";
import useResizeObserver from "@react-hook/resize-observer";

export function Cover({backgroundColor, show, onClick, config, width, title}) {
  const ref = useRef(null);
  const widthRef = useRef(100);
  useResizeObserver(ref, (entry) => {
    const newWidth = entry?.width;
    if(newWidth && newWidth !== widthRef.current){
      widthRef.current = newWidth;
      ref.current.style.fontSize = calcFont({
        text: title,
        containerWidth: newWidth,
        baseFontSize,
      });
    }
  });
  const {baseFontSize, unitSize, borderRadius} = config;

  return <div
    ref={ref}
    style={{
      backgroundColor,
      pointerEvents: show ? "none" : "auto",
      borderRadius: borderRadius * unitSize,
    }}
    onClick={onClick}
    className={css.cover + " " + (show ? css.hide : css.show)}>
    {title}
  </div>;
}
