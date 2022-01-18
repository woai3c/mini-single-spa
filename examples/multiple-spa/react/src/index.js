import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(props = {}) {
  const { container } = props;

  function helper(container) {
      let div = container.querySelector('#root')
      if (!div) {
        div = document.createElement('div')
        div.id = 'root'
        container.appendChild(div)
      }

      return div
  }

  ReactDOM.render(<App />, container ? helper(container) : document.querySelector('#root'));
}

if (!window.__IS_SINGLE_SPA__) {
  render()
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
