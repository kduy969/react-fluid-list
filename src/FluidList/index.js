import {Node} from "./Node";
import css from './FluidList.module.css';
import React from "react";
import {useEffect, useState} from "react";

function countNode(list) {
  let sum = 0;
  list.forEach((n) => {
    if (n instanceof Array) {
      sum += countNode(n);
    } else
      sum += 1;
  });
  return sum;

}

function fillNode(container, nodes) {
  if (nodes.length === 0) {
    return;
  }

  let filledNodes = [];
  let remainingNodes = [...nodes];

  let ocHeight = 0;
  let ocWidth = 0;
  let currentLineHeight = 0;

  let previousNode = null;

  function addNodeToCurrentLine(node) {

    currentLineHeight = Math.max(node.h, currentLineHeight);
    ocWidth += node.w;
    previousNode = node;
    filledNodes.push(node);
  }

  function enterNextLine() {
    ocHeight += currentLineHeight;
    ocWidth = 0;
    previousNode = null;
    currentLineHeight = 0;
  }

  function isNodeExceedContainerHeight(node) {
    //console.log('isNodeExceedContainerHeight', node, container, ocHeight);
    if (!container.height) {
      return false;
    }
    if (ocHeight + node.h > container.height) {
      //console.log('Node exceed', node, container);
    }

    return ocHeight + node.h > container.height;
  }

  while (remainingNodes.length > 0) {
    const processNode = remainingNodes[0];
    const remainingWidth = container.width - ocWidth;
    if (processNode.w > container.width) {
      break;
    }
    if (previousNode && processNode.h < previousNode.h) {
      //fill
      const childContainer = {
        width: container.width - ocWidth,
        height: currentLineHeight,
      };
      //console.log('Fill node', childContainer);
      const fillRes = fillNode(childContainer, remainingNodes);
      //add processed nodes
      filledNodes.push(fillRes.filledNodes);
      //remove processed node
      if (!remainingNodes)
        console.log('Wrong data', remainingNodes);
      else
        remainingNodes.splice(0, countNode(fillRes.filledNodes));
      enterNextLine();
      //console.log('Enter line after fill node', fillRes.filledNodes);
    } else {
      if (isNodeExceedContainerHeight(processNode)) {
        break;
      }

      if (remainingWidth < processNode.w) {
        enterNextLine();
        //console.log('Enter line 2 at', processNode, remainingWidth, processNode.w, container.width);
        if (isNodeExceedContainerHeight(processNode)) {
          break;
        }
        //console.log('add node 1', processNode.title, remainingWidth, processNode.w, ocWidth, container);
        addNodeToCurrentLine(processNode);
        remainingNodes.shift();
      } else {
        //console.log('add node 2', processNode.title, processNode.w, ocWidth, container);
        addNodeToCurrentLine(processNode);
        remainingNodes.shift();
      }


    }
  }
  console.log("End", container);
  return {
    remainingNodes,
    filledNodes,
  }
}

export default function FluidList({items, className, maxWidth, width, isRoot = true}) {
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    if (isRoot) {
      const nodes = items.map(item => ({
        w: (item.w || 70),
        h: (item.h || 50),
        title: item.title,
      }));
      const res = fillNode({
        width: width,
      }, nodes);
      console.log('fill nodes res', res);
      setNodes(res.filledNodes);
    } else {
      setNodes(items);
    }
  }, [items]);

  return <div style={{
    maxWidth,
    width,
    flexGrow: isRoot ? 0 : 1,
    flexShrink: isRoot ? 0 : 1,
    backgroundColor: isRoot ? undefined : 'green',
  }} className={css.list + ' ' + className || ''}>
    {nodes.map((item, index) => {
      if (item instanceof Array) {
        return <FluidList key={index} isRoot={false} items={item}/>
      }

      return <Node key={index} node={item}/>
    })}
  </div>
}
