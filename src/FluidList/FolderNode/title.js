import React from "react";
import css from "./FolderNode.module.css";

export function Title({title, config}) {
  const {titleH, unitSize, baseFontSize} = config;
  return <div style={{
    height: titleH * unitSize,
    fontSize: baseFontSize,
  }} className={css.title}>{title}
  </div>;
}
