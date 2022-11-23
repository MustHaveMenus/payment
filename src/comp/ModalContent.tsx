import styles from './ModalContent.module.scss';
import {JSXElement} from "solid-js";

interface ModalContentProps {
  children?: JSXElement,
  withFooter?: boolean;
  withHeader?: boolean;
}

const ModalContent = (props: ModalContentProps) => {
  return <div classList={{
    [styles.modalContent]: true,
    [styles.withFooter]: props.withFooter,
    [styles.withHeader]: props.withHeader
  }}>{props.children}</div>
}
export default ModalContent;
