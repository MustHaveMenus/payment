import styles from './ModalWrapper.module.scss';
import {JSXElement} from "solid-js";

interface ModalWrapperProps {
  children?: JSXElement
}

const ModalWrapper = ({children}: ModalWrapperProps) => {
  return <div class={styles.modalWrapper}>{children}</div>
}
export default ModalWrapper;
