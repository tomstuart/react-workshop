const createElement = (type, props, children) => (
  {
    type,
    props: { ...(typeof children !== 'undefined' && { children }), ...props }
  }
);

const createClass = specification => (
  props => {
    const instance = {
      ...specification,
      props,
      setState(state) {
        this.state = { ...this.state, ...state };
        this.update();
      }
    };
    instance.state = instance.getInitialState ? instance.getInitialState() : null;
    return instance;
  }
);

export default { createElement, createClass };
