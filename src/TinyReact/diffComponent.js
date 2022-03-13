import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(virtualDom, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDom, oldComponent)) {
    // 是同一个组件做更新操作
    updateComponent(virtualDom, oldComponent, oldDOM, container);
  } else {
    // 不是同一个组件
    mountElement(virtualDom, container, oldDOM);
  }
}

function isSameComponent(virtualDom, oldComponent) {
  return oldComponent && virtualDom.type === oldComponent.constructor;
}
