import styles from './ModalContent.module.scss';
import {JSXElement} from "solid-js";
import mobileState from "../state/mobile";
import viewState from "../state/view";
import {View} from "../type/types";

interface ModalContentProps {
  children?: JSXElement,
  withFooter?: boolean;
  withHeader?: boolean;
}

const ModalContent = (props: ModalContentProps) => {
  const {mobile} = mobileState;
  const {view} = viewState;
  return <div classList={{
    [styles.modalContent]: true,
    [styles.withFooter]: props.withFooter,
    [styles.withHeader]: props.withHeader,
    [styles.location]: view() === View.LOCATION,
    [styles.mobile]: mobile(),
  }}>{props.children}</div>
}
export default ModalContent;
