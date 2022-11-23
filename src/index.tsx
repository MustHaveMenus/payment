import './style/index.scss';
import {render} from 'solid-js/web';
import Setup, {SetupProps} from './modal/Setup';

let container: HTMLElement | undefined = undefined;
let destroy: ((() => void) | undefined) = undefined;

const init = (props: SetupProps) => {
  container = document.createElement("div");
  document.body.append(container);
  destroy = render(() => <Setup {...props} onClose={ProModal.hide}/>, container);
}

const ProModal = {
  hide: () => {
    if (!container) return;
    container.style.display = 'none';
  },
  show: (props: SetupProps) => {
    if (!container) init(props);
    if (!container) return;
    container.style.display = 'block';
  },
  destroy: () => {
    destroy?.();
    destroy = undefined;

    container?.remove();
    container = undefined;
  }
}

export {ProModal};
