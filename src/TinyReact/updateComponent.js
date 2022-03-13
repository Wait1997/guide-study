import diff from "./diff";

export default function updateComponent(virtualDom, oldComponent, oldDOM, container) {
  oldComponent.componentWillReceiveProps(virtualDom.props);

  if (oldComponent.shouldComponentUpdate) {
    // 未更新前的props
    const prevProps = oldComponent.props;
    oldComponent.componentWillUpdate(virtualDom.props);
    // 组件更新
    oldComponent.updateProps(virtualDom.props);
    // 获取更新的virtualDOM(刚刚获取的virtualdom 上面还没有挂载组件实例)
    let nextVirtualDOM = oldComponent.render();

    nextVirtualDOM.component = oldComponent;
    diff(nextVirtualDOM, container, oldDOM);
    oldComponent.componentDidUpdate(prevProps);
  }
}
