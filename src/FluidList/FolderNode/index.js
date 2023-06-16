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

function refineFolderWidth(width, items) {
  let result = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.items) {
      if (result + item.w > width) {
        break;
      } else {
        console.log('add', result, item.w);
        result += item.w;
      }
    }
  }
  console.log('result', result);
  if (result === 0 || ((result / width) < 0.8)) {
    return width;
  }
  return result;
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
    // on mount -> calculate column span to ensure folder have a good shape
    // base on R
    const S = items.reduce((total = 0, item) => {
      return total + getSize(item);
    }, 0);
    const R = 4 / 2;
    const targetWidth = Math.ceil(Math.sqrt(R * S));
    return targetWidth;
    return refineFolderWidth(targetWidth, items);
  }, [items]);
  const gridColumn = Math.ceil((colCount + (padding + margin) * 2) * multiply);

  const onChildListResize = useCallback((size) => {
    // when container finish rendered -> calculate row span base on new height
    if (!size?.height)
      return;
    const row = size.height / unitSize;
    let gridRow = ((row || 1) + titleH + (padding) * 2) * multiply;
    gridRow = Math.ceil(gridRow);
    ref.current.style.gridRow = `span ${gridRow}`;
  }, [unitSize, multiply, titleH, padding]);

  const hideCover = useCallback(() => {
    setShow(true);
  }, []);

  const color = folder.color || COLORS[Math.floor(Math.random() * 10) % COLORS.length];
  return <div
    ref={ref}
    className={css.container}
    style={{
      gridColumn: `span ${gridColumn}`,
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
