export default function updateTextNode(virtualDom, oldVirtualDOM, oldDOM) {
  if (virtualDom.props.textContent !== oldVirtualDOM.props.textContent) {
    // 更新真实dom元素内容
    oldDOM.textContent = virtualDom.props.textContent;
    // 更新virtualDOM元素
    oldDOM._virtualDom = virtualDom;
  }
}
