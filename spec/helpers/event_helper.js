'use strict';

beforeEach(function () {
  global.clickOn = function (target) {
    var click = new window.MouseEvent('click', { bubbles: true });
    target.dispatchEvent(click);
  };

  global.fillIn = function (target, value) {
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
});
