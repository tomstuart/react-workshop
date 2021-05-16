global.clickOn = target => {
  var click = new window.MouseEvent('click', { bubbles: true });
  target.dispatchEvent(click);
};

global.fillIn = (target, value) => {
  target.value = value;

  // I can’t work out how to do this in a way that works for both real
  // and fake React, so I’m just papering over the cracks for now.

  // for real React:
  var ReactTestUtils = require('react-dom/test-utils');
  ReactTestUtils.Simulate.change(target);

  // for fake React:
  var change = new window.Event('change', { bubbles: true });
  target.dispatchEvent(change);
};

var clean = node => {
  var Node = node.ownerDocument.defaultView.Node;

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      for (var i = node.attributes.length - 1; i >= 0; --i) {
        var attribute = node.attributes[i];
        if (attribute.name.startsWith('data-')) {
          node.removeAttribute(attribute.name);
        }
      }

      for (var i = node.childNodes.length - 1; i >= 0; --i) {
        var child = node.childNodes[i];
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
    var actual = container.cloneNode(true);
    clean(actual);
    actual.normalize();

    var expected = container.cloneNode(true);
    expected.innerHTML = html;

    return {
      pass: actual.isEqualNode(expected),
      message: "Expected '" + expected.innerHTML + "', got '" + actual.innerHTML + "'"
    };
  }
});
