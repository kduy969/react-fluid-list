import css from './TextNode.module.css';
import React from "react";
import FluidList from "../../index";

export function FolderNode(props) {
  return <FluidList
    style={{
      backgroundColor: 'green',
      gridColumn: `span ${5 * props.multiply}`,
      gridRow: `span ${1 * props.multiply}`,
      overflow: 'visible',
    }}
    unitSize={unitSize} multiply={multiply} items={item}/>
}
