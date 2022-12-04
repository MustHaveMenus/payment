import './style/index.scss';
import {render} from 'solid-js/web';
import App, {AppProps} from './App';
import AlertModal, {AlertModalProps} from "./comp/AlertModal";
import {ViewType} from "./type/types";

let container: HTMLElement | undefined = undefined;
let destroy: ((() => void) | undefined) = undefined;

const init = (props: AppProps) => {
  container = document.createElement("div");
  container.classList.add('pro-modal');
  document.body.append(container);
  destroy = render(() => <App {...props} onClose={ProModal.hide}/>, container);
}

const ProModal = {
  hide: () => {
    if (!container) return;
    container.style.display = 'none';
  },
  show: (props: AppProps) => {
    if (!container) init(props);
    if (!container) return;
    container.style.display = 'block';
  },
  upgrade: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.FREE_TO_PRO});
  },
  pause: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.PAUSE});
  },
  cancel: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.CANCEL});
  },
  reactivate: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.REACTIVATE});
  },
  resume: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.RESUME});
  },
  addLocation: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.ADD_LOCATION_ADDON});
  },
  addUser: (props: AppProps) => {
    ProModal.show({...props, type: ViewType.ADD_USER_ADDON});
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
