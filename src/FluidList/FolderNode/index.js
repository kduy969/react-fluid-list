import React, {useCallback, useEffect, useState} from "react";
import FluidList from "../index";
import css from './FolderNode.module.css';
import {COLORS} from "../constants";
import {Cover} from "./cover";
import {Title} from "./title";
import {calcFont} from "../helper";

function getSize(item) {
  if (item.items) {
    return item.items.reduce((total = 0, item) => {
      return total + getSize(item);
    }, 0);
  } else
    return (item.w || 1) * (item.h || 1);
}

export function CFolderNode({baseFontSize, unitSize, multiply, folder, titleH = 0.7, padding = 0.1, margin = 0.1}) {
  const {items, title} = folder;
  const [col, setCol] = useState(1);
  const [row, setRow] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // on mount -> calculate column span to ensure folder have good shape
    // base on R
    const S = items.reduce((total = 0, item) => {
      return total + getSize(item);
    }, 0);
    const R = 4 / 2;
    const targetWidth = Math.ceil(Math.sqrt(R * S));
    setCol(targetWidth);
    //console.log('Set col', targetWidth, R, S);
  }, [items]);

  const onResize = useCallback((size) => {
    // when container finish rendered -> calculate row span base on new height
    if (!size?.height)
      return;
    //console.log('Set row', size, size.height / unitSize);
    setRow(Math.round((size.height / unitSize) * multiply) / multiply);
  }, [unitSize, multiply]);

  const color = COLORS[Math.floor(Math.random() * 10) % COLORS.length];
  return <div
    className={css.container}
    style={{
      gridColumn: `span ${(col + (padding + margin) * 2) * multiply}`,
      gridRow: `span ${((row || 1) + titleH + (padding) * 2) * multiply}`,
      overflow: 'visible',
      position: 'relative',
      padding: padding * unitSize,
      backgroundColor: color + '4D'
    }}
  >
    <Title fontSize={baseFontSize} titleH={titleH} unitSize={unitSize} title={title}/>
    <FluidList
      baseFontSize={baseFontSize}
      onResize={onResize}
      unitSize={unitSize} multiply={multiply} items={items}/>
    <Cover fontSize={calcFont({
      text: title,
      containerWidth: col * unitSize,
      baseFontSize,
    })} backgroundColor={color} show={show} onClick={() => {
      setShow(!show);
    }} title={title}/>
  </div>
}

export const FolderNode = React.memo(CFolderNode);
