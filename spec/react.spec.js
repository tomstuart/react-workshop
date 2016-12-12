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

    describe('rendering an HTML element with attributes', function () {
      beforeEach(function () {
        element = React.createElement('img', { src: 'cat.jpg' });
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'img',
          props: {
            src: 'cat.jpg'
          }
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<img src="cat.jpg">');
      });
    });

    describe('rendering an HTML element with children', function () {
      beforeEach(function () {
        element = React.createElement('a', { href: 'animals.html' }, [
          React.createElement('img', { src: 'cat.jpg' }),
          React.createElement('img', { src: 'dog.jpg' })
        ]);
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'a',
          props: {
            href: 'animals.html',
            children: [
              objectWith({ type: 'img', props: { src: 'cat.jpg' } }),
              objectWith({ type: 'img', props: { src: 'dog.jpg' } })
            ]
          }
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<a href="animals.html"><img src="cat.jpg"><img src="dog.jpg"></a>');
      });
    });

    describe('rendering an HTML element with text children', function () {
      beforeEach(function () {
        element = React.createElement(
          'span',
          {},
          ['Hello', ', world!']
        );
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'span',
          props: {
            children: ['Hello', ', world!']
          }
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<span>Hello, world!</span>');
      });
    });

    describe('rendering an HTML element with mixed children', function () {
      beforeEach(function () {
        element = React.createElement(
          'span',
          {},
          ['Hello', React.createElement('br'), 'world!']
        );
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'span',
          props: {
            children: [
              'Hello',
              objectWith({ type: 'br', props: {} }),
              'world!'
            ]
          }
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<span>Hello<br>world!</span>');
      });
    });

    describe('rendering an HTML element with a class attribute', function () {
      beforeEach(function () {
        element = React.createElement(
          'img',
          {
            className: 'fluffy',
            src: 'cat.jpg'
          }
        );
      });

      it('creates the element', function () {
        expect(element).toEqual(objectWith({
          type: 'img',
          props: {
            className: 'fluffy',
            src: 'cat.jpg'
          }
        }));
      });

      it('renders the element to the DOM', function () {
        ReactDOM.render(element, container);
        expect(container).toContainHTML('<img class="fluffy" src="cat.jpg">');
      });
    });
  });
});
