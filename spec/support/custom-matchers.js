import { expect } from '@jest/globals';

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

    case Node.TEXT_NODE:
      if (/^\s+$/.test(node.data)) {
        node.remove();
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
    actual.normalize();
    clean(actual);
    actual.normalize();

    const expected = container.cloneNode(true);
    expected.innerHTML = html;
    expected.normalize();
    clean(expected);
    expected.normalize();

    return {
      pass: actual.isEqualNode(expected),
      message: () => `Expected '${expected.innerHTML}', got '${actual.innerHTML}'`
    };
  }
});
