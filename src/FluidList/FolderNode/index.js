import React, {useCallback, useState, useRef, useMemo} from "react";
import FluidList from "../index";
import css from './FolderNode.module.css';
import {COLORS} from "../constants";
import {Cover} from "./cover";
import {Title} from "./title";

function getSize(item) {
  if (item.items) {
    return item.items.reduce((total = 0, item) => {
      return total + getSize(item);
    }, 0);
  } else
    return (item.w || 1) * (item.h || 1);
}

export function CFolderNode({folder, config}) {
  const ref = useRef(null);
  const {unitSize, multiply, titleH, padding, margin, borderRadius} = config;
  const {items, title} = folder;
  // const [col, setCol] = useState(1);
  // const [row, setRow] = useState(null);
  const [show, setShow] = useState(false);

  // fixed col, row flexible
  const colCount = useMemo(() => {
    // on mount -> calculate column span to ensure folder have good shape
    // base on R
    const S = items.reduce((total = 0, item) => {
      return total + getSize(item);
    }, 0);
    const R = 4 / 2;
    const targetWidth = Math.ceil(Math.sqrt(R * S));
    return targetWidth;
  }, [items]);

  const onChildListResize = useCallback((size) => {
    // when container finish rendered -> calculate row span base on new height
    if (!size?.height)
      return;
    const row = Math.round((size.height / unitSize) * multiply) / multiply;
    ref.current.style.gridRow = `span ${((row || 1) + titleH + (padding) * 2) * multiply}`;
  }, [unitSize, multiply, titleH, padding]);

  const hideCover = useCallback(() => {
    setShow(true);
  }, []);

  const color = folder.color || COLORS[Math.floor(Math.random() * 10) % COLORS.length];
  return <div
    ref={ref}
    className={css.container}
    style={{
      gridColumn: `span ${(colCount + (padding + margin) * 2) * multiply}`,
      // gridRow: `span ${((row || 1) + titleH + (padding) * 2) * multiply}`,
      overflow: 'visible',
      position: 'relative',
      padding: padding * unitSize,
      backgroundColor: color + '4D',
      borderRadius: borderRadius * unitSize,
    }}
  >
    <Title config={config} title={title}/>
    <FluidList
      config={config}
      onResize={onChildListResize}
      items={items}/>
    <Cover
      config={config}
      backgroundColor={color} show={show} onClick={hideCover} title={title}/>
  </div>
}

export const FolderNode = React.memo(CFolderNode);
