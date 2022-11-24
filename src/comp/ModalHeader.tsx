import styles from './ModalHeader.module.scss';
import {JSXElement} from "solid-js";
import {GenericModalProps} from "./Modal";
import CloseIcon from "./svg/CloseIcon";
import BackIcon from "./svg/BackIcon";
import openState from "../state/open";

interface ModalHeaderProps extends GenericModalProps {
  children?: JSXElement,
}

const ModalHeader = (props: ModalHeaderProps) => {
  const {closeModal} = openState;
  return <div class={styles.headerWrapper}>
    {props.onBack && <div class={styles.back} onClick={props.onBack}><BackIcon/></div>}
    {props.children}
    <div classList={{[styles.close]: true, [styles.closeSecondary]: props.secondaryCloseBtn}} onClick={closeModal}><CloseIcon/></div>
  </div>
}
export default ModalHeader;
