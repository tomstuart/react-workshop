global.clickOn = target => {
  const click = new window.MouseEvent('click', { bubbles: true });
  target.dispatchEvent(click);
};

global.fillIn = (target, value) => {
  target.value = value;

  // I can’t work out how to do this in a way that works for both real
  // and fake React, so I’m just papering over the cracks for now.

  // for real React:
  const ReactTestUtils = require('react-dom/test-utils');
  ReactTestUtils.Simulate.change(target);

  // for fake React:
  const change = new window.Event('change', { bubbles: true });
  target.dispatchEvent(change);
};

const clean = node => {
  const Node = node.ownerDocument.defaultView.Node;

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      for (let i = node.attributes.length - 1; i >= 0; --i) {
        const attribute = node.attributes[i];
        if (attribute.name.startsWith('data-')) {
          node.removeAttribute(attribute.name);
        }
      }

      for (let i = node.childNodes.length - 1; i >= 0; --i) {
        const child = node.childNodes[i];
        clean(child);
      }

      break;

    case Node.COMMENT_NODE:
      node.remove();
      break;
  }
};

expect.extend({
  toContainHTML(container, html) {
    const actual = container.cloneNode(true);
    clean(actual);
    actual.normalize();

    const expected = container.cloneNode(true);
    expected.innerHTML = html;

    return {
      pass: actual.isEqualNode(expected),
      message: () => `Expected '${expected.innerHTML}', got '${actual.innerHTML}'`
    };
  }
});
