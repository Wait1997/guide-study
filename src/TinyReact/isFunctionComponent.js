import isFunction from './isFunction';

export default function isFunctionComponent(virtualDom) {
  const type = virtualDom.type;
  return type && isFunction(virtualDom) && !(type.prototype && type.prototype.render);
}
