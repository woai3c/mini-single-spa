import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(options = {}) {
  const { container } = options;

  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}


export async function mount(options) {
  window.spaGlobalState.onChange((state, operator, key) => {
    alert(`react 子应用监听到 spa 全局状态发生了变化: ${JSON.stringify(state)}，操作: ${operator}，变化的属性: ${key}`)
  })

  window.spaGlobalState.on('testEvent', () => alert('react 子应用监听到父应用发送了一个全局事件: testEvent'))
  
  console.log('[react16] options from main framework', options);
  render(options);
}

export async function unmount(options) {
  const { container } = options;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (window.__IS_SINGLE_SPA__) {
  window.__SINGLE_SPA__ = {
    mount,
    unmount
  }
} else {
  render()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
