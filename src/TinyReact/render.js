import diff from './diff';

export default function render(virtualDom, container, oldDOM = container.firstChild) {
  diff(virtualDom, container, oldDOM);
}
