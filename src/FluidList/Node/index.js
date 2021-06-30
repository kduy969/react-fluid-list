import css from './Node.module.css';
import React from "react";

export function Node({node}) {
  const {title, w = 150, h = 50} = node;
  return <p style={{
    height: h - 20 - 10,
    width: w - 20 - 10,
    maxWidth: (w - 20 - 10) * 2
  }} className={css.container}>
    {title}
  </p>;
}
