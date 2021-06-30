import React from "react";
import css from "./FolderNode.module.css";

export function Title(props) {
  return <div style={{
    height: props.titleH * props.unitSize,
    fontSize: props.fontSize,
  }} className={css.title}>{props.title}
  </div>;
}
