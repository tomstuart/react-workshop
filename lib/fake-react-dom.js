'use strict';

var React = React || require('./fake-react');

var render = function (element, container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  renderAppend(element, container);
};

var renderAppend = function (element, container) {
  switch (typeof element.type) {
    case 'string':
      var node = container.ownerDocument.createElement(element.type);

      Object.keys(element.props).forEach(function (key) {
        var value = element.props[key];

        switch (key) {
          case 'children':
            value.forEach(function (child) {
              switch (typeof child) {
                case 'object':
                  renderAppend(child, node);
                  break;
                case 'string':
                  var text = container.ownerDocument.createTextNode(child);
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
      var result = element.type(element.props);

      if (result.render) {
        result.update = function () { render(result.render(), container); };
        renderAppend(result.render(), container);
      } else {
        renderAppend(result, container);
      }
      break;
  }
};

var ReactDOM = {
  render: render
};

module.exports = ReactDOM;
