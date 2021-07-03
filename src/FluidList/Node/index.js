import css from './Node.module.css';
import React from "react";
import {COLORS} from "../constants";
import {calcFont} from "../helper";

// var renderTime = 0;
export const Node = React.memo(function ({node, config}) {
  const {multiply, baseFontSize, unitSize, borderRadius} = config;
  const {title, w = 1, h = 1} = node;
  // renderTime++;
  // console.log('Render time', renderTime, title);
  return <p
    style={{
      fontSize: calcFont({
        text: title,
        baseFontSize,
        containerWidth: w * unitSize,
      }),
      borderRadius: borderRadius * unitSize,
      gridColumn: `span ${w * multiply}`,
      gridRow: `span ${h * multiply}`,
      backgroundColor: node.color || COLORS[Math.floor(Math.random() * 10) % COLORS.length] + 'CC',
    }}
    className={css.container}>
    {title}
  </p>;
});
