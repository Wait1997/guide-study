import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDom, container) {
  const newElement = createDOMElement(virtualDom);

  // 将转换之后的DOM对象放置在页面中
  container.appendChild(newElement);

  const component = virtualDom.component;
  if (component) {
    component.setDOM(newElement);
  }
}
