import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDom, container, oldDOM) {
  let nextVirtualDOM = null;

  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDom)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDom);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDom);
  }

  if (isFunction(nextVirtualDOM)) {
    // 递归构建组件
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }
}

function buildFunctionComponent(virtualDom) {
  return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
  // 获取类组件实例
  const component = new virtualDom.type(virtualDom.props || {});
  // 获取类组件virtualDOM(old)
  const nextVirtualDom = component.render();
  // 在虚拟dom下面挂载组件的实例对象
  nextVirtualDom.component = component;
  return nextVirtualDom;
}
