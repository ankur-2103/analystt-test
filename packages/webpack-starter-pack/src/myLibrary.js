import { h } from 'snabbdom';

//function to create virtual node
const createVNode = (type, props = {}, ...children) => {
  children = children.flat();

  if (type.prototype && type.prototype.isMyLibraryClassComponent) {
    const componentInstance = new type(props);

    componentInstance.__vNode = componentInstance.render();

    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    }

    return componentInstance.__vNode;
  }
  if (typeof (type) == 'function') {
    return type(props);
  }

  props = props || {};
  let dataProps = {};
  let eventProps = {};

  for(let propKey in props) {
    if (propKey.startsWith('on')) {
      const event = propKey.substring(2).toLowerCase();

      eventProps[event] = props[propKey];
    }
    else {
      dataProps[propKey] = props[propKey];
    }
  }

  return h(type, { props: dataProps, on: eventProps }, children);
};

// component base class
class Component {
  constructor() { }

  componentDidMount() { }

  updateState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    }
    MyLibrary.__updater(this);
  }

  render() { }
}

Component.prototype.isMyLibraryClassComponent = true;

const MyLibrary = {
  createVNode,
  Component
};

export default MyLibrary;