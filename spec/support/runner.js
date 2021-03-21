'use strict';

import specs from '../react.spec.js';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import FakeReact from '../../lib/fake-react.js';
import FakeReactDOM from '../../lib/fake-react-dom.js';

var implementations = {
  real: {
    React,
    createReactClass,
    ReactDOM,
    pending: function () {}
  },
  fake: {
    React: FakeReact,
    createReactClass: FakeReact.createClass,
    ReactDOM: FakeReactDOM,
    pending: pending
  }
};

Object.keys(implementations).forEach(function (name) {
  var implementation = implementations[name];
  var React = implementation.React;
  var createReactClass = implementation.createReactClass;
  var ReactDOM = implementation.ReactDOM;
  var pending = implementation.pending;

  describe('React and ReactDOM (' + name + ' implementation)', function () {
    specs(React, createReactClass, ReactDOM, pending);
  });
});
