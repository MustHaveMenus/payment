import styles from './ModalWrapper.module.scss';
import {JSXElement} from "solid-js";

interface ModalWrapperProps {
  children?: JSXElement;
  onClose?: () => void;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  function onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains(styles.modalWrapper)) {
      props.onClose?.();
    }
  }
  return <div class={styles.modalWrapper} onClick={onClick}>{props.children}</div>
}
export default ModalWrapper;
