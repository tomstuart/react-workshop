const render = (element, container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  renderAppend(element, container);
};

const renderAppend = ({ type, props }, container) => {
  switch (typeof type) {
    case 'string':
      const node = container.ownerDocument.createElement(type);

      Object.entries(props).forEach(([key, value]) => {
        switch (key) {
          case 'children':
            value.forEach(child => {
              switch (typeof child) {
                case 'object':
                  renderAppend(child, node);
                  break;
                case 'string':
                  const text = container.ownerDocument.createTextNode(child);
                  node.appendChild(text);
                  break;
              }
            });
            break;
          case 'className':
            node.className = value;
            break;
          case 'onClick':
            node.addEventListener('click', value);
            break;
          case 'onChange':
            node.addEventListener('change', value);
            break;
          default:
            node.setAttribute(key, value);
            break;
        }
      });

      container.appendChild(node);
      break;

    case 'function':
      const result = type(props);

      if (result.render) {
        result.update = () => { render(result.render(), container); };
        renderAppend(result.render(), container);
      } else {
        renderAppend(result, container);
      }
      break;
  }
};

export default { render };
