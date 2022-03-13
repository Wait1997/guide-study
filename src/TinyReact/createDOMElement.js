import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function createDOMElement(virtualDom) {
  let newElement = null;

  if (virtualDom.type === "text") {
    // 文本节点
    newElement = document.createTextNode(virtualDom.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDom.type);
    updateNodeElement(newElement, virtualDom);
  }

  // 给每一个元素添加旧的virtualDOM属性
  newElement._virtualDom = virtualDom;

  // 递归创建子节点
  virtualDom.children.forEach(child => {
    // 递归遍历子节点构建全部的dom
    mountElement(child, newElement);
  });

  return newElement;
}
