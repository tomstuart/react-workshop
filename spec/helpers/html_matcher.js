'use strict';

var clean = function (node) {
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

beforeEach(function () {
  jasmine.addMatchers({
    toContainHTML: function () {
      return {
        compare: function (container, html) {
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
      };
    }
  });
});

