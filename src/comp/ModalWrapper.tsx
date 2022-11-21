import styles from './ModalWrapper.module.scss';
import {JSXElement} from "solid-js";

interface ModalWrapperProps {
  children?: JSXElement;
  onClose?: () => void;
}

const ModalWrapper = ({children, onClose}: ModalWrapperProps) => {
  function onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains(styles.modalWrapper)) {
      onClose?.();
    }
  }
  return <div class={styles.modalWrapper} onClick={onClick}>{children}</div>
}
export default ModalWrapper;
