import styles from './ModalFooter.module.scss';
import {JSXElement} from "solid-js";
import mobileState from "../state/mobile";

interface ModalFooterProps {
  children?: JSXElement,
}

const ModalFooter = (props: ModalFooterProps) => {
  const {mobile} = mobileState;
  return <div classList={{
    [styles.modalFooter]: true,
    [styles.mobile]: mobile()
  }}>{props.children}</div>
}
export default ModalFooter;
