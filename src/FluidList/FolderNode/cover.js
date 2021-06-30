import React from "react";
import css from "./FolderNode.module.css";

export function Cover(props) {
  return <div
    style={{
      backgroundColor: props.backgroundColor,
      pointerEvents: props.show ? "none" : "auto",
      fontSize: props.fontSize,
    }}
    onClick={props.onClick}
    className={css.cover + " " + (props.show ? css.hide : css.show)}>
    {props.title}
  </div>;
}
