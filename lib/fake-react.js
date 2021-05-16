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

const useState = value => {
  const currentValue = value; // TODO ok but where do we actually store the value?
  const setValue = () => {};
  return [currentValue, setValue];
};

export default { createElement, createClass, useState };
