import diff from './diff';

export default class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    // setState 被子类调用 因此此时的 this 指向 子类
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的 virtualDom 对象
    const virtualDom = this.render();
    // 获取旧的 virtualDom 对象 进行比对
    const oldDOM = this.getDOM();

    // 获取容器
    const container = oldDOM.parentNode;

    // 实现
    diff(virtualDom, container, oldDOM);
  }

  setDOM(dom) {
    this._dom = dom;
  }

  getDOM() {
    return this._dom;
  }
}
