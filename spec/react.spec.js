'use strict';

var specs = function (React, ReactDOM, pending) {
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
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: 'br',
        props: {}
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<br>');
    });
  });

  describe('rendering an HTML element with attributes', function () {
    beforeEach(function () {
      element = React.createElement('img', { src: 'cat.jpg' });
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: 'img',
        props: {
          src: 'cat.jpg'
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: 'span',
        props: {
          children: ['Hello', ', world!']
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

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
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: 'img',
        props: {
          className: 'fluffy',
          src: 'cat.jpg'
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<img class="fluffy" src="cat.jpg">');
    });
  });

  describe('rendering an HTML element with a click handler', function () {
    it('triggers the click handler when clicked', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      var clicked = false;
      var handleClick = function () { clicked = true; };

      element = React.createElement('span', { id: 'target', onClick: handleClick }, ['Click me!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span id="target">Click me!</span>');

      expect(clicked).toBe(false);
      clickOn(document.getElementById('target'));
      expect(clicked).toBe(true);
    });
  });

  describe('rendering an HTML element with a change handler', function () {
    it('triggers the change handler when changed', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      var number = null;
      var handleChange = function (event) { number = parseInt(event.target.value); };

      element = React.createElement('input', { id: 'target', type: 'text', onChange: handleChange });
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<input id="target" type="text">');

      expect(number).toBe(null)
      fillIn(document.getElementById('target'), '42');
      expect(number).toBe(42);
    });
  });

  describe('re-rendering an HTML element', function () {
    it('updates the DOM to match the new element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      element = React.createElement('span', {}, ['Hello, world!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, world!</span>');

      element = React.createElement('span', {}, ['¡Hola, mundo!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>¡Hola, mundo!</span>');
    });
  });

  describe('rendering a functional component', function () {
    var Greeting;

    beforeEach(function () {
      Greeting = function (props) {
        return React.createElement('span', {}, ['Hello, ', props.name, '!']);
      };

      element = React.createElement(Greeting, { name: 'Clarice' });
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: Greeting,
        props: {
          name: 'Clarice'
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, Clarice!</span>');
    });
  });

  describe('rendering nested functional components', function () {
    var Greeting, App;

    beforeEach(function () {
      Greeting = function (props) {
        return React.createElement('span', {}, ['Hello, ', props.name, '!']);
      };

      App = function (props) {
        return React.createElement('p', {}, [
          React.createElement(Greeting, { name: 'Alice' }),
          React.createElement(Greeting, { name: 'Bob' }),
          React.createElement(Greeting, { name: 'Charlie' })
        ]);
      };

      element = React.createElement(App);
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: App,
        props: {}
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<p><span>Hello, Alice!</span><span>Hello, Bob!</span><span>Hello, Charlie!</span></p>');
    });
  });

  describe('rendering a class component', function () {
    var Greeting;

    beforeEach(function () {
      Greeting = React.createClass({
        render: function () {
          return React.createElement('span', {}, ['Hello, ', this.props.name, '!']);
        }
      });

      element = React.createElement(Greeting, { name: 'Newman' });
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: Greeting,
        props: {
          name: 'Newman'
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, Newman!</span>');
    });
  });

  describe('rendering a class component with state', function () {
    var Counter;

    beforeEach(function () {
      Counter = React.createClass({
        getInitialState: function () {
          return { count: this.props.initialCount };
        },

        render: function () {
          return React.createElement(
            'span',
            {},
            [
              'There are ',
              this.state.count.toString(),
              ' ',
              this.props.noun
            ]
          );
        }
      });

      element = React.createElement(Counter, { initialCount: 2, noun: 'lights' });
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: Counter,
        props: {
          initialCount: 2,
          noun: 'lights'
        }
      }));
    });

    it('renders the element to the DOM', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>There are 2 lights</span>');
    });
  });

  describe('automatically re-rendering a class component', function () {
    var Counter;

    beforeEach(function () {
      Counter = React.createClass({
        getInitialState: function () {
          return { count: this.props.initialCount };
        },

        handleClick: function () {
          this.setState({ count: this.state.count + 1 });
        },

        render: function () {
          return React.createElement(
            'span',
            {
              id: 'target',
              onClick: this.handleClick.bind(this)
            },
            [
              'There are ',
              this.state.count.toString(),
              ' ',
              this.props.noun
            ]
          );
        }
      });

      element = React.createElement(Counter, { initialCount: 2, noun: 'lights' });
    });

    it('creates the element', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(objectWith({
        type: Counter,
        props: {
          initialCount: 2,
          noun: 'lights'
        }
      }));
    });

    it('re-renders the element to the DOM when its state changes', function () {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);

      var target = document.getElementById('target');

      expect(container).toContainHTML('<span id="target">There are 2 lights</span>');
      clickOn(target);
      expect(container).toContainHTML('<span id="target">There are 3 lights</span>');
      clickOn(target);
      expect(container).toContainHTML('<span id="target">There are 4 lights</span>');
    });
  });
};

module.exports = specs;
