import specs from '../react.spec.js';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import FakeReact from '../../lib/fake-react.js';
import FakeReactDOM from '../../lib/fake-react-dom.js';

const implementations = {
  real: {
    React,
    createReactClass,
    ReactDOM,
    pending: () => {},
  },
  fake: {
    React: FakeReact,
    createReactClass: FakeReact.createClass,
    ReactDOM: FakeReactDOM,
    pending,
  },
};

for (const [name, implementation] of Object.entries(implementations)) {
  describe(`React and ReactDOM (${name} implementation)`, () => {
    specs(implementation);
  });
}
