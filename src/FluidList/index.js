import {Node} from "./Node";
import css from './FluidList.module.css';
import React from "react";
import {useEffect, useState, useMemo} from "react";
import {FolderNode} from "./FolderNode";
import {useSize} from "../hooks/useSize";

const DEFAULT_CONFIG = {
  baseFontSize: 7,
  unitSize: 20,
  multiply: 1,
  titleH: 0.7,
  padding: 0.1,
  margin: 0.1,
  borderRadius: 0.1,
}

export default React.memo(
  function FluidList({
                       items, className, width, style, onResize, config
                     }) {
    const memoConfig = useMemo(() => {
      return {...DEFAULT_CONFIG, ...config}
    }, [config]);
    const {baseFontSize, unitSize, multiply} = memoConfig;

    const [colCount, setColCount] = useState(null);
    const containerRef = React.useRef(null);
    useSize(containerRef, (containerSize) => {
      if (onResize) onResize(containerSize);
      const newColCount = Math.trunc(containerSize.width / (unitSize / multiply));

      if (colCount !== newColCount) {
        setColCount(newColCount);
      }

    });

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
            key={index}
            config={memoConfig}
            folder={item}/>
        }
        return <Node
          config={memoConfig}
          key={index}
          node={item}/>
      })}
    </div>
  }
);
