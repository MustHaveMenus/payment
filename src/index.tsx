import {render} from 'solid-js/web';
import Component, {ComponentProps} from './components/Component'

const mount = (props: ComponentProps, el?: HTMLElement) => {
  if (!el) {
    el = document.createElement("div");
    document.body.append(el);
  }
  render(() => <Component {...props}/>, el);
}

const Payment = {
  mount
}

export {Payment};
