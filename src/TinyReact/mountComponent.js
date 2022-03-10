import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDom, container) {
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
    mountComponent(nextVirtualDOM, container);
  } else {
    mountNativeElement(nextVirtualDOM, container);
  }
}

function buildFunctionComponent(virtualDom) {
  return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
  const component = new virtualDom.type(virtualDom.props || {});
  const nextVirtualDom = component.render();
  // 在虚拟dom下面挂载组件的实例对象
  nextVirtualDom.component = component;
  return nextVirtualDom;
}
