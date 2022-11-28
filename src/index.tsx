import './style/index.scss';
import {render} from 'solid-js/web';
import Setup, {SetupProps} from './modal/Setup';
import AlertModal, {AlertModalProps} from "./comp/AlertModal";

let container: HTMLElement | undefined = undefined;
let destroy: ((() => void) | undefined) = undefined;

const init = (props: SetupProps) => {
  container = document.createElement("div");
  container.classList.add('pro-modal');
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

const Alert = {
  show: (props: AlertModalProps) => {
    container = document.createElement("div");
    container.classList.add('mhm-alert');
    document.body.append(container);
    destroy = render(() => <AlertModal {...props}/>, container);
  }
}

export {ProModal, Alert};
