import styles from './ModalHeader.module.scss';
import {JSXElement} from "solid-js";
import {GenericModalProps} from "./Modal";
import CloseIcon from "./svg/CloseIcon";
import BackIcon from "./svg/BackIcon";

interface ModalHeaderProps extends GenericModalProps {
  children?: JSXElement,
}

const ModalHeader = (props: ModalHeaderProps) => {
  return <div class={styles.headerWrapper}>
    {props.children}
    {!props.children && <>
      {props.onBack && <div class={styles.back} onClick={props.onBack}><BackIcon/></div>}
      {props.onClose && <div class={`${styles.close} ${props.secondaryCloseBtn ? styles.closeSecondary : ''}`} onClick={props.onClose}><CloseIcon/></div>}
    </>}
  </div>
}
export default ModalHeader;
