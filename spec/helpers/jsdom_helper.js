'use strict';

beforeEach(function () {
  var jsdom = require('jsdom');
  global.window = new jsdom.JSDOM().window;
  global.document = window.document;
});
