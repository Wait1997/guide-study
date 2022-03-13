import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDom, container, oldDOM) {
  // 生成真正的dom元素
  const newElement = createDOMElement(virtualDom);

  if (oldDOM) {
    container.insertBefore(newElement, oldDOM);
  } else {
    // 将转换之后的DOM对象放置在页面中
    container.appendChild(newElement);
  }

  if (oldDOM) {
    unmountNode(oldDOM);
  }

  // 组件的实例对象
  const component = virtualDom.component;
  if (component) {
    component.componentDidmount();
    component.setDOM(newElement);
  }
}
