import diff from "./diff";

/**
 * 通过 react.element 构建真实 dom
 * @param {*} virtualDom 虚拟dom(每次更新的最新的dom)
 * @param {*} container 需要挂载的真实dom(根元素)
 * @param {*} oldDOM 上一次生成的react.element(首次更新还没有生成)
 */
export default function render(virtualDom, container, oldDOM = container.firstChild) {
  // 生成真实的dom
  diff(virtualDom, container, oldDOM);
}
