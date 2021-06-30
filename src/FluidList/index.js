import {Node} from "./Node";
import css from './FluidList.module.css';
import React from "react";
import {useEffect, useState} from "react";
import {FolderNode} from "./FolderNode";
import {useSize} from "../hooks/useSize";


export default React.memo(function FluidList({baseFontSize, items, className, width, unitSize, multiply = 1, style, onResize}) {
  const [colCount, setColCount] = useState(null);
  const containerRef = React.useRef(null);
  const containerSize = useSize(containerRef);


  useEffect(() => {
    if (onResize)
      onResize(containerSize);
  }, [containerSize?.width, containerSize?.height, onResize]);

  useEffect(() => {
    // calculate column size
    if (containerSize?.width) {
      const newColCount = Math.trunc(containerSize.width / (unitSize / multiply));
      setColCount(newColCount);
    }
  }, [containerSize?.width, unitSize, multiply, baseFontSize]);

  return <div
    ref={containerRef}
    style={{
      ...style || {},
      width,
      gridAutoRows: `${Math.trunc(unitSize / multiply)}px`,
      gridTemplateColumns: `repeat(${colCount}, 1fr)`,
    }} className={css.list + ' ' + className || ''}>
    {colCount && items.map((item, index) => {
      if (item.items instanceof Array) {
        return <FolderNode
          baseFontSize={baseFontSize}
          unitSize={unitSize} multiply={multiply} folder={item}/>
      }
      return <Node unitSize={unitSize} baseFontSize={baseFontSize} multiply={multiply} key={index} node={item}/>
    })}
  </div>
});
