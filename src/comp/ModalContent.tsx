import styles from  './ModalContent.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentProps {
  children?: JSXElement
}

const ModalContent = (props: ModalContentProps) => {
  return <div class={styles.modalContent}>{props.children}</div>
}
export default ModalContent;
