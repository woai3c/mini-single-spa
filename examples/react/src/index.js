import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(options = {}) {
  const { container } = options;

  ReactDOM.render(<App />, container ? container.querySelector('#root'): document.querySelector('#root'));
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(options) {
  console.log('[react16] options from main framework', options);
  render(options);
}

export async function unmount(options) {
  const { container } = options;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (window.__IS_SINGLE_SPA__) {
  window['mini-single-spa-react'] = {
    bootstrap,
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
