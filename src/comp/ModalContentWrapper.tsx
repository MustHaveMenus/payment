import styles from './ModalContentWrapper.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentWrapperProps {
  children?: JSXElement;
  mobile?: boolean;
}

const ModalContentWrapper = (props: ModalContentWrapperProps) => {
  return <div class={`${styles.modalContentWrapper} ${props.mobile ? styles.mobile : ''}`}>{props.children}</div>
}
export default ModalContentWrapper;
