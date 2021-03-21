import specs from '../react.spec.js';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import FakeReact from '../../lib/fake-react.js';
import FakeReactDOM from '../../lib/fake-react-dom.js';

[
  {
    name: 'real',
    React,
    createReactClass,
    ReactDOM,
    pending: () => {},
  },
  {
    name: 'fake',
    React: FakeReact,
    createReactClass: FakeReact.createClass,
    ReactDOM: FakeReactDOM,
    pending,
  },
].forEach(({ name, ...functions }) => {
  describe(`React and ReactDOM (${name} implementation)`, () => {
    specs(functions);
  });
});
