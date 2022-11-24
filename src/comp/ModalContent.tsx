import styles from './ModalContent.module.scss';
import {JSXElement} from "solid-js";
import mobileState from "../state/mobile";

interface ModalContentProps {
  children?: JSXElement,
  withFooter?: boolean;
  withHeader?: boolean;
}

const ModalContent = (props: ModalContentProps) => {
  const {mobile} = mobileState;
  return <div classList={{
    [styles.modalContent]: true,
    [styles.withFooter]: props.withFooter,
    [styles.withHeader]: props.withHeader,
    [styles.mobile]: mobile(),
  }}>{props.children}</div>
}
export default ModalContent;
