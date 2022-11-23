import styles from './ModalWrapper.module.scss';
import {JSXElement} from "solid-js";
import openState from "../state/open";

interface ModalWrapperProps {
  children?: JSXElement;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const {closeModal} = openState;

  function onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains(styles.modalWrapper)) {
      closeModal();
    }
  }

  return <div class={styles.modalWrapper} onClick={onClick}>{props.children}</div>
}
export default ModalWrapper;
