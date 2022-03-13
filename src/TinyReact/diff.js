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

    // 1. 将拥有key属性的子元素放置在一个单独的对象中
    let keyedElements = {};
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i];
      // 排除文本节点
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute;
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    const hasNoKey = Object.keys(keyedElements).length === 0;

    if (hasNoKey) {
      // 对比子节点
      virtualDom.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i]);
      });
    } else {
      // 2. 循环 virtualDOM 的子元素 获取子元素的 key 属性
      virtualDom.children.forEach((child, i) => {
        const key = child.props.key;
        if (key) {
          const domElement = keyedElements[key];
          if (domElement) {
            // 新旧位置的元素不匹配(调整位置)
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
            }
          }
        } else {
          // 新增元素
          mountElement(child, oldDOM, oldDOM.childNodes[i]);
        }
      });
    }

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;

    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDom.children.length) {
      if (hasNoKey) {
        // 有节点需要删除
        for (let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i];
          const oldChildKey = oldChild._virtualDom.props.key;
          let found = false;
          for (let n = 0; n < virtualDom.children.length; n++) {
            if (oldChildKey === virtualDom.children[n].props.key) {
              found = true;
              break;
            }
          }
          if (!found) {
            unmountNode(oldChild);
          }
        }
      }
    }
  }
}
