import styles from  './ModalContent.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentProps {
  children?: JSXElement,
  withFooter?: boolean;
  withHeader?: boolean;
}

const ModalContent = (props: ModalContentProps) => {
  return <div class={`${styles.modalContent} ${props.withFooter ? styles.withFooter : ''} ${props.withHeader ? styles.withHeader : ''}`}>{props.children}</div>
}
export default ModalContent;
