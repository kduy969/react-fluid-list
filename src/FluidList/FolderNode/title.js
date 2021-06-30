import React, {Component} from "react";
import css from "./FolderNode.module.css";

export class Title extends Component {
  render() {
    return <div style={{
      height: this.props.titleH * this.props.unitSize,
    }} className={css.title}>{this.props.title}
    </div>;
  }
}
