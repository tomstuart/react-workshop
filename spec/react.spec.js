'use strict';

var implementations = {
  real: {
    React: require('react'),
    ReactDOM: require('react-dom')
  },
  fake: {
    React: require('../lib/fake-react'),
    ReactDOM: require('../lib/fake-react-dom')
  }
};

Object.keys(implementations).forEach(function (name) {
  var implementation = implementations[name];
  var React = implementation.React;
  var ReactDOM = implementation.ReactDOM;

  describe('React and ReactDOM (' + name + ' implementation)', function () {
    var container, element;

    beforeEach(function () {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(function () {
      document.body.removeChild(container);
      container = null;
      element = null;
    });

    describe('rendering an HTML element', function () {
      beforeEach(function () {
        element = React.createElement('br');
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'br',
          props: {}
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<br>');
      });
    });
  });
});
