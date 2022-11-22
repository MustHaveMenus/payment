import styles from './ModalFooter.module.scss';
import {JSXElement} from "solid-js";

interface ModalFooterProps {
  children?: JSXElement,
}

const ModalFooter = (props: ModalFooterProps) => {
  return <div class={`${styles.modalFooter}`}>{props.children}</div>
}
export default ModalFooter;
