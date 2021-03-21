'use strict';

var createElement = function (type, props, children) {
  if (typeof children === 'undefined') {
    props = Object.assign({}, props);
  } else {
    props = Object.assign({ children: children }, props);
  }

  return { type: type, props: props };
};

var createClass = function (specification) {
  var constructor = function (props) {
    var result = Object.assign({}, specification);
    result.props = props;
    result.state = result.getInitialState ? result.getInitialState() : {};
    result.setState = function (state) {
      this.state = Object.assign({}, this.state, state);
      this.update();
    };
    return result;
  };

  return constructor;
};

var React = {
  createElement: createElement,
  createClass: createClass
};

module.exports = React;
