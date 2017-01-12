'use strict';

var specs = require('./react.spec.js');

var implementations = {
  real: {
    React: require('react'),
    ReactDOM: require('react-dom'),
    pending: function () {}
  },
  fake: {
    React: require('../lib/fake-react'),
    ReactDOM: require('../lib/fake-react-dom'),
    pending: pending
  }
};

Object.keys(implementations).forEach(function (name) {
  var implementation = implementations[name];
  var React = implementation.React;
  var ReactDOM = implementation.ReactDOM;
  var pending = implementation.pending;

  specs(name, React, ReactDOM, pending);
});
