import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import MyLibrary from './myLibrary';

const patch = snabbdom.init([propsModule, eventlistenersModule]);

//maintain the latest rootVNode returned by render
let rootVNode;

//render node in root node
const render = (el, rootDomElement) => {
  if (rootVNode == null) {
    rootVNode = rootDomElement;
  }

  rootVNode = patch(rootVNode, el);
}

//update component
MyLibrary.__updater = (componentInstance) => {
  const oldVNode = componentInstance.__vNode;
  const newVNode = componentInstance.render();

  componentInstance.__vNode = patch(oldVNode, newVNode);
}

const MyLibraryDom = {
  render
};

export default MyLibraryDom;