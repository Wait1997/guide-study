import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    // setState 被子类调用 因此此时的 this 指向 子类
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的 virtualDom 对象
    const virtualDom = this.render();
    // 获取旧的dom对象(再通过dom的属性_virtualDom进行比对)
    const oldDOM = this.getDOM();

    // 获取容器(每个组件的根标签)
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

  updateProps(props) {
    this.props = props;
  }

  componentWillMount() {}
  componentDidmount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}
}
