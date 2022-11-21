import {render} from 'solid-js/web';
import App, {AppProps} from './components/App'

const mount = (props: AppProps, el?: HTMLElement) => {
  if (!el) {
    el = document.createElement("div");
    document.body.append(el);
  }
  render(() => <App {...props}/>, el);
}

const Payment = {
  mount
}

export {Payment};
