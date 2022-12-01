import './style/index.scss';
import {render} from 'solid-js/web';
import Setup, {SetupProps} from './modal/Setup';
import AlertModal, {AlertModalProps} from "./comp/AlertModal";
import {ViewType} from "./type/types";

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
  upgrade: (props: SetupProps) => {
    ProModal.show({...props, type: ViewType.FREE_TO_PRO});
  },
  pause: (props: SetupProps) => {
    ProModal.show({...props, type: ViewType.PAUSE});
  },
  cancel: (props: SetupProps) => {
    ProModal.show({...props, type: ViewType.CANCEL});
  },
  reactivate: (props: SetupProps) => {
    ProModal.show({...props, type: ViewType.REACTIVATE});
  },
  resume: (props: SetupProps) => {
    ProModal.show({...props, type: ViewType.RESUME});
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
    const container = document.createElement("div");
    container.classList.add('mhm-alert');
    document.body.append(container);
    const destroy = render(() => <AlertModal {...props}/>, container);
    setTimeout(() => {
      destroy();
    }, 10000)
  },
  showError: (props: AlertModalProps) => {
    const container = document.createElement("div");
    container.classList.add('mhm-alert');
    document.body.append(container);
    const destroy = render(() => <AlertModal {...props} error/>, container);
    setTimeout(() => {
      destroy();
    }, 10000)
  }
}

export {ProModal, Alert};
