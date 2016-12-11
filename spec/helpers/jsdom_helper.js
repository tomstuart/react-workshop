'use strict';

beforeEach(function () {
  var jsdom = require('jsdom');
  global.document = jsdom.jsdom();
  global.window = document.defaultView;
});
