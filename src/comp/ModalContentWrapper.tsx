import styles from './ModalContentWrapper.module.scss';
import {JSXElement} from "solid-js";
import mobileState from "../state/mobile";

interface ModalContentWrapperProps {
  children?: JSXElement;
}

const ModalContentWrapper = (props: ModalContentWrapperProps) => {
  const {mobile} = mobileState;
  return <div classList={{[styles.mobile]: mobile(), [styles.modalContentWrapper]: true}}>{props.children}</div>
}
export default ModalContentWrapper;
