import './style/index.scss';
import {render} from 'solid-js/web';
import Setup, {SetupProps} from './modal/Setup';

const init = (props: SetupProps, el?: HTMLElement) => {
  if (!el) {
    el = document.createElement("div");
    document.body.append(el);
  }
  render(() => <Setup {...props}/>, el);
}

const Payment = {
  init
}

export {Payment};
