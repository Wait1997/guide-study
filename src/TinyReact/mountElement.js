import isFunction from './isFunction';
import mountComponent from './mountComponent';
import mountNativeElement from './mountNativeElement';

export default function mountElement(virtualDom, container) {
  if (isFunction(virtualDom)) {
    // Component: 组件
    mountComponent(virtualDom, container);
  } else {
    // NativeElement：dom元素
    mountNativeElement(virtualDom, container);
  }
}
