import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDom, container, oldDOM) {
  // createElement 方法生成的虚拟 dom 的 type 为 function
  if (isFunction(virtualDom)) {
    // Component: 组件
    mountComponent(virtualDom, container, oldDOM);
  } else {
    // NativeElement：dom元素
    mountNativeElement(virtualDom, container, oldDOM);
  }
}
