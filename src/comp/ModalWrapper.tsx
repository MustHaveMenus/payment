import styles from './ModalWrapper.module.scss';
import {createSignal, JSXElement} from "solid-js";
import openState from "../state/open";

interface ModalWrapperProps {
  children?: JSXElement;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const {closeModal} = openState;
  const [elem, setElem] = createSignal(undefined as HTMLElement | undefined);

  function onMouseDown(e: MouseEvent) {
    setElem(e.target as HTMLElement);
  }

  function onMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target === elem() && target.classList.contains(styles.modalWrapper)) {
      closeModal();
    }
  }

  return <div class={styles.modalWrapper} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>{props.children}</div>
}
export default ModalWrapper;
