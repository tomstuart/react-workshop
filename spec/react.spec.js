// These tests incrementally describe some of the React and ReactDOM API.
// They run once against the real React and ReactDOM, and then run again
// against the fake React and ReactDOM implementations in lib/fake-react.js
// and lib/fake-react-dom.js.

export default function ({ React, createReactClass, ReactDOM, pending }) {
  // Before every test, we create a <div> and add it to an HTML document.
  // We’ll use this <div> as a container (i.e. a parent) for any HTML elements
  // we create later on.

  let container, element;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    element = null;
  });

  describe('rendering an HTML element', () => {
    // Our first tests are about rendering a very simple HTML element: <br>.
    // This job happens in two stages, so there are two tests.
    //
    // Before each test runs, we call React.createElement() with the name of
    // the HTML element we want to render (React calls this the element’s
    // “type”), and store its result in a variable.

    beforeEach(() => {
      element = React.createElement('br');
    });

    // Time for our first test! This test checks that we get back a “React
    // element” as the result of calling React.createElement() in the
    // beforeEach block above. A React element is just a plain JavaScript
    // object with particular named properties.
    //
    // In this simple case, that means the result should be a JavaScript object
    // with properties called “type” and “props”. (A React element can be more
    // complicated than this, but we’ll get to that in later tests.)
    //
    // To make this test pass, you will need to edit lib/fake-react.js and put
    // some code inside the definition of createElement() so that it returns an
    // object with the right properties.

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'br',
        props: {}
      }));
    });

    // Our second test checks that we can use ReactDOM.render() to turn a React
    // element into an HTML element.
    //
    // We call ReactDOM.render() with two arguments: the React element from
    // earlier, and an existing HTML element to use as a container (i.e.
    // parent) for the new HTML element we want to create.
    //
    // The test checks that the container ends up containing a <br>.
    //
    // To make this test pass, you will need to edit lib/fake-react-dom.js and
    // put some code inside the definition of render() so that it creates a new
    // HTML element and adds it as a child of the container.
    //
    // (Hint: use the createElement() and appendChild() methods from the DOM
    // API.)

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<br>');
    });
  });

  describe('rendering an HTML element with attributes', () => {
    // The next two tests are about rendering a more complicated HTML element
    // that has an attribute: <img src="cat.jpg">.
    //
    // Before each test runs, we call React.createElement() with the name of
    // the HTML element and a JavaScript object (React calls this the element’s
    // “props”) whose properties correspond to the attributes of the HTML
    // element we want to render.

    beforeEach(() => {
      element = React.createElement('img', { src: 'cat.jpg' });
    });

    // The first test checks that React.createElement() has copied the props
    // onto the React element it returns. You’ll need to edit lib/fake-react.js
    // again to update your implementation of createElement().
    //
    // (Hint: there are a few different ways of doing this without breaking the
    // previous tests, but if you get stuck, you might find JavaScript’s
    // Object.assign() method helpful.)

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'img',
        props: {
          src: 'cat.jpg'
        }
      }));
    });

    // The second test checks that ReactDOM.render() uses the props to add
    // attributes to the HTML element that it creates. You’ll need to edit
    // lib/fake-react-dom.js again to update your implementation of render().
    //
    // The test will pass if the container ends up containing the HTML element
    // <img src="cat.jpg">.
    //
    // (Hint: use the setAttribute() method from the DOM API. There are a few
    // different ways of doing it, but if you get stuck, you might find
    // JavaScript’s Object.keys() and forEach() methods useful.)

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<img src="cat.jpg">');
    });
  });

  describe('rendering an HTML element with children', () => {
    // Now we’re going to try rendering nested HTML elements:
    // <a href="animals.html"><img src="cat.jpg"><img src="dog.jpg"></a>.
    //
    // When we call React.createElement() before each test, we pass in a third
    // argument: an array of child React elements (React calls this array
    // “children”).

    beforeEach(() => {
      element = React.createElement('a', { href: 'animals.html' }, [
        React.createElement('img', { src: 'cat.jpg' }),
        React.createElement('img', { src: 'dog.jpg' })
      ]);
    });

    // The first test checks that React.createElement() has copied the children
    // onto the right part of the React element it returns.
    //
    // Notice that “children” is not a top-level property of the React element;
    // instead it’s one of its props, at the same level as “href”.
    //
    // (Hint: there are a few different ways of doing this without breaking the
    // previous tests, but if you get stuck, you might find JavaScript’s
    // typeof operator helpful.)

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'a',
        props: {
          href: 'animals.html',
          children: [
            expect.objectContaining({ type: 'img', props: { src: 'cat.jpg' } }),
            expect.objectContaining({ type: 'img', props: { src: 'dog.jpg' } })
          ]
        }
      }));
    });

    // The second test checks that ReactDOM.render() can render children inside
    // an HTML element.
    //
    // (Hint: you have already implemented a method that can render a React
    // element into a container as HTML.)

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<a href="animals.html"><img src="cat.jpg"><img src="dog.jpg"></a>');
    });
  });

  describe('rendering an HTML element with text children', () => {
    // The next two tests are about rendering an HTML element that contains
    // text: <span>Hello, world!</span>.
    //
    // When we call React.createElement(), we pass in strings as children
    // (rather than proper React elements) to express that we want plain text
    // inside the HTML element.

    beforeEach(() => {
      element = React.createElement(
        'span',
        {},
        ['Hello', ', world!']
      );
    });

    // The first test checks that the string children are passed through to the
    // React element by React.createElement(). It might already work!

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'span',
        props: {
          children: ['Hello', ', world!']
        }
      }));
    });

    // The second test checks that ReactDOM.render() can render text inside an
    // HTML element.
    //
    // (Hint: use JavaScript’s typeof operator, and the createTextNode() method
    // from the DOM API.)

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, world!</span>');
    });
  });

  describe('rendering an HTML element with mixed children', () => {
    // The next two tests are about rendering an HTML element that contains
    // both text and other HTML elements: <span>Hello<br>world!</span>.
    //
    // When we call React.createElement(), we pass in both strings and React
    // elements as children.

    beforeEach(() => {
      element = React.createElement(
        'span',
        {},
        ['Hello', React.createElement('br'), 'world!']
      );
    });

    // The first test checks that both string and element children are passed
    // through to the React element by React.createElement(). It might already
    // work!

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'span',
        props: {
          children: [
            'Hello',
            expect.objectContaining({ type: 'br', props: {} }),
            'world!'
          ]
        }
      }));
    });

    // The second test checks that ReactDOM.render() can render both text and
    // HTML elements inside another HTML element. It might already work!

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello<br>world!</span>');
    });
  });

  describe('rendering an HTML element with a class attribute', () => {
    // The next two tests are about rendering an HTML element with a class
    // attribute: <img class="fluffy" src="cat.jpg">.
    //
    // “class” is a reserved word in JavaScript, so we can’t use it as the name
    // of a property. When we call React.createElement() we pass in a prop
    // called “className” instead.

    beforeEach(() => {
      element = React.createElement(
        'img',
        {
          className: 'fluffy',
          src: 'cat.jpg'
        }
      );
    });

    // The first test checks that the className prop is passed through to the
    // React element by React.createElement(). It might already work!

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: 'img',
        props: {
          className: 'fluffy',
          src: 'cat.jpg'
        }
      }));
    });

    // The second test checks that ReactDOM.render() knows that a className
    // prop should be rendered as an HTML class attribute.

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<img class="fluffy" src="cat.jpg">');
    });
  });

  describe('rendering an HTML element with a click handler', () => {
    // This test is about rendering an HTML element with a click handler. When
    // we call React.createElement() we pass in the click handler function as a
    // prop called “onClick”.
    //
    // The test checks that the handler function is called when the rendered
    // HTML element is clicked on.
    //
    // (Hint: use the addEventListener() method from the DOM API.)

    it('triggers the click handler when clicked', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      let clicked = false;
      const handleClick = function () { clicked = true; };

      element = React.createElement('span', { id: 'target', onClick: handleClick }, ['Click me!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span id="target">Click me!</span>');

      expect(clicked).toBe(false);
      clickOn(document.getElementById('target'));
      expect(clicked).toBe(true);
    });
  });

  describe('rendering an HTML element with a change handler', () => {
    // This test is about rendering an HTML element with a change handler. When
    // we call React.createElement() we pass in the change handler function as
    // a prop called “onChange”.
    //
    // The test checks that the handler function is called when the value of
    // the rendered HTML element is changed.

    it('triggers the change handler when changed', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      let number = null;
      const handleChange = function (event) { number = parseInt(event.target.value); };

      element = React.createElement('input', { id: 'target', type: 'text', onChange: handleChange });
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<input id="target" type="text">');

      expect(number).toBe(null)
      fillIn(document.getElementById('target'), '42');
      expect(number).toBe(42);
    });
  });

  describe('re-rendering an HTML element', () => {
    // One of React’s main features is that it can update the DOM when your
    // data changes. This test is about re-rendering a React element into the
    // same HTML element container. It checks that rendering a different
    // element into the same container updates its contents.
    //
    // (Hint: use the firstChild property and removeChild() method from the DOM
    // API. Don’t try to be too clever; do the simplest thing that works! You
    // may need to reorganise your code a little to make this test pass.)

    it('updates the DOM to match the new element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      element = React.createElement('span', {}, ['Hello, world!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, world!</span>');

      element = React.createElement('span', {}, ['¡Hola, mundo!']);
      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>¡Hola, mundo!</span>');
    });
  });

  // Everything gets more difficult from now on.

  describe('rendering a functional component', () => {
    // Until now we’ve always used a string as the React element type, but
    // React also supports providing a JavaScript function as the element type.
    // The function should take a props object as argument and return another
    // React element. React calls this a “functional component”.
    //
    // At render time, the function gets called with the element’s props, and
    // the resulting React element is rendered into the page.

    let Greeting;

    beforeEach(() => {
      // Greeting is the functional component here; it’s a function that takes
      // props and returns a span element containing data from those props.

      Greeting = function (props) {
        return React.createElement('span', {}, ['Hello, ', props.name, '!']);
      };

      element = React.createElement(Greeting, { name: 'Clarice' });
    });

    // The first test checks that the type prop is passed through to the React
    // element by React.createElement(). It might already work!

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: Greeting,
        props: {
          name: 'Clarice'
        }
      }));
    });

    // The second test checks that a functional component is rendered to the
    // DOM by ReactDOM.render(). This means that render() is responsible for
    // calling the Greeting function and then rendering the result as HTML.

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, Clarice!</span>');
    });
  });

  describe('rendering nested functional components', () => {
    // Of course, an element returned by a functional component might itself be
    // functional. These tests check that ReactDOM.render() can handle
    // functional components nested inside each other.

    let Greeting, App;

    beforeEach(() => {
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

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: App,
        props: {}
      }));
    });

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<p><span>Hello, Alice!</span><span>Hello, Bob!</span><span>Hello, Charlie!</span></p>');
    });
  });

  describe('rendering a class component', () => {
    // React supports a third kind of element type, which it calls a “class
    // component”. These are also functions, just like functional components,
    // but instead of directly returning a React element, they return an object
    // with a render() method. It’s that render() method which is responsible
    // for returning a React element.
    //
    // (Traditionally, a JavaScript “class” is a function which returns an
    // object with methods, which is why React calls these functions “class
    // components”.)
    //
    // At render time, the class component gets called with the element’s
    // props, then render() is called on the object it returns, and the
    // resulting React element is rendered into the page.
    //
    // React’s API provides the React.createClass() method for creating these
    // class components. We pass in a “specification” of the class, which
    // includes a “render” property to tell createClass how to render that
    // component.
    //
    // To make these tests pass, you will need to edit lib/fake-react.js and
    // put some code inside the definition of createClass() so that it returns
    // a class component. You’ll also need to edit lib/fake-react-dom.js to
    // teach ReactDOM.render() how to render a class component.

    let Greeting;

    beforeEach(() => {
      Greeting = createReactClass({
        render: function () {
          return React.createElement('span', {}, ['Hello, ', this.props.name, '!']);
        }
      });

      element = React.createElement(Greeting, { name: 'Newman' });
    });

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: Greeting,
        props: {
          name: 'Newman'
        }
      }));
    });

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>Hello, Newman!</span>');
    });
  });

  describe('rendering a class component with state', () => {
    // Why does React have both functional and class components? Because the
    // object returned by a class component can be used to store data that
    // changes in response to user actions; React calls this data “state”. When
    // the state changes, the component can be re-rendered by calling render()
    // again on the same object.
    //
    // Functional components are stateless, which makes them simpler but less
    // useful in cases where we need the user to be able to cause changes in
    // the UI.
    //
    // To use state, we provide a getInitialState function as part of the class
    // component specification; this is called when the component is
    // instantiated, and the resulting data is stored as the “state” property
    // of the component instance so that its render method can access it.

    let Counter;

    beforeEach(() => {
      Counter = createReactClass({
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

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: Counter,
        props: {
          initialCount: 2,
          noun: 'lights'
        }
      }));
    });

    it('renders the element to the DOM', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);
      expect(container).toContainHTML('<span>There are 2 lights</span>');
    });
  });

  describe('automatically re-rendering a class component', () => {
    // Of course, the whole point of having state is so that it can change!
    // React class components support a setState() method that updates the
    // state and automatically re-renders the component to the DOM.
    //
    // This is very challenging! To make these tests pass, you’ll need some way
    // to remember where the element was first rendered into the DOM so that
    // you can re-render it in the same place when its state changes.

    let Counter;

    beforeEach(() => {
      Counter = createReactClass({
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

    it('creates the element', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      expect(element).toEqual(expect.objectContaining({
        type: Counter,
        props: {
          initialCount: 2,
          noun: 'lights'
        }
      }));
    });

    it('re-renders the element to the DOM when its state changes', () => {
      pending('not implemented yet'); // TODO remove this line to enable the test

      ReactDOM.render(element, container);

      const target = document.getElementById('target');

      expect(container).toContainHTML('<span id="target">There are 2 lights</span>');
      clickOn(target);
      expect(container).toContainHTML('<span id="target">There are 3 lights</span>');
      clickOn(target);
      expect(container).toContainHTML('<span id="target">There are 4 lights</span>');
    });
  });
};
