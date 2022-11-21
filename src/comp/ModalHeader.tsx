import styles from './ModalHeader.module.scss';
import {JSXElement} from "solid-js";
import {GenericModalProps} from "./Modal";
import CloseIcon from "./svg/CloseIcon";
import BackIcon from "./svg/BackIcon";

interface ModalHeaderProps extends GenericModalProps {
  children?: JSXElement
}

const ModalHeader = ({children, onClose, onBack}: ModalHeaderProps) => {
  return <div class={styles.headerWrapper}>
    {children}
    {!children && <>
      {onBack && <div class={styles.back} onClick={onBack}><BackIcon/></div>}
      {onClose && <div class={styles.close} onClick={onClose}><CloseIcon/></div>}
    </>}
  </div>
}
export default ModalHeader;
