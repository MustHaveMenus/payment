import styles from './AlertModal.module.scss';
import CheckIcon from "./svg/CheckIcon";

export interface AlertModalProps {
  text: string;
  error?: boolean;
  duration?: number;
}

const AlertModal = (props: AlertModalProps) => {
  return <div classList={{[styles.alert]: true, [styles.error]: props.error}}>
    <div class={styles.alertContent}>
      <div class={styles.icon}><CheckIcon/></div>
      <div>{props.text}</div>
    </div>
  </div>
}
export default AlertModal;
