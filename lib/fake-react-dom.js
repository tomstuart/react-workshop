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

      for (const [key, value] of Object.entries(props)) {
        switch (key) {
          case 'children':
            for (const child of value) {
              switch (typeof child) {
                case 'object':
                  // TODO big problem here: child might be a stateful component, but
                  // we’re ignoring any instance of it that was previously mounted here.
                  // is it ok to disregard this for educational purposes?
                  // should there be a further escalation which expects child
                  // components to maintain state across re-renders?
                  // can we do this only for hooks (ignore/remove class components)?
                  renderAppend(child, node);
                  break;
                case 'string':
                  const text = container.ownerDocument.createTextNode(child);
                  node.appendChild(text);
                  break;
              }
            }
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
      }

      container.appendChild(node);
      break;

    case 'function':
      const result = type(props); // TODO multiple calls to useState may fire during this

      if (result.render) {
        // TODO `type` was a class component, so `result` is a class component instance
        result.update = () => { render(result.render(), container); };
        renderAppend(result.render(), container);
      } else {
        // TODO `type` was a functional component, so `result` is an element
        // TODO needs useState support — so maybe we can set `update` on the element itself?
        result.update = () => { render(type(props), container); }; // TODO remember mount point in closure (this is clever)
        // TODO but how does this help us? how will we ever call it?
        renderAppend(result, container);
      }
      break;
  }
};

export default { render };
