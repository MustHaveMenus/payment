import styles from './ModalContentWrapper.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentWrapperProps {
  children?: JSXElement
}

const ModalContentWrapper = ({children}: ModalContentWrapperProps) => {
  return <div class={styles.modalContentWrapper}>{children}</div>
}
export default ModalContentWrapper;
