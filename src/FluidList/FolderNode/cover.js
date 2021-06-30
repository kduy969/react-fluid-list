import React, {Component} from "react";
import css from "./FolderNode.module.css";

export class Content extends Component {
  render() {
    return <div
      style={{
        backgroundColor: this.props.backgroundColor,
        pointerEvents: this.props.show ? "none" : "auto"
      }}
      onClick={this.props.onClick} className={css.cover + " " + (this.props.show ? css.hide : css.show)}>
      {this.props.title}
    </div>;
  }
}
