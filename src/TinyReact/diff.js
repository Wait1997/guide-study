import isFunction from "./isFunction";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDom, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDom;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;

  // 判断 oldDOM 是否存在(首次渲染没有)
  if (!oldDOM) {
    mountElement(virtualDom, container);
  } else if (virtualDom.type !== oldVirtualDOM.type && !isFunction(virtualDom)) {
    const newElement = createDOMElement(virtualDom);
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDom.type === "function") {
    // 组件
    diffComponent(virtualDom, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM && virtualDom.type === oldVirtualDOM.type) {
    if (virtualDom.type === "text") {
      // 更新内容
      updateTextNode(virtualDom, oldVirtualDOM, oldDOM);
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDom, oldVirtualDOM);
    }

    virtualDom.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i]);
    });

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;

    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDom.children.length) {
      // 有节点需要删除
      for (let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
