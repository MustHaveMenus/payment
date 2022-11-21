import styles from  './ModalContent.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentProps {
  children?: JSXElement
}

const ModalContent = ({children}: ModalContentProps) => {
  return <div class={styles.modalContent}>{children}</div>
}
export default ModalContent;
