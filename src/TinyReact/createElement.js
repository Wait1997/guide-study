export default function createElement(type, props, ...children) {
  const childElements = [...children].reduce((result, child) => {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        // 文本
        result.push(createElement('text', { textContent: child }));
      }
    }
    return result;
  }, []);

  return {
    type,
    props: { children: childElements, ...props },
    children: childElements
  };
}
