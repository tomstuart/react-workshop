import specs from '../react.spec.js';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import FakeReact from '../../lib/fake-react.js';
import FakeReactDOM from '../../lib/fake-react-dom.js';

const unskippableIt = function () { it.apply(this, arguments); };
unskippableIt.skip = unskippableIt;

const implementations = {
  real: {
    React,
    createReactClass,
    ReactDOM,
    it: unskippableIt,
  },
  fake: {
    React: FakeReact,
    createReactClass: FakeReact.createClass,
    ReactDOM: FakeReactDOM,
    it,
  },
};

for (const [name, implementation] of Object.entries(implementations)) {
  describe(`React and ReactDOM (${name} implementation)`, () => {
    specs(implementation);
  });
}
