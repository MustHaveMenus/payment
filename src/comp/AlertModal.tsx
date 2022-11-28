import styles from './Alert.module.scss';
import CheckIcon from "./svg/CheckIcon";

export interface AlertModalProps {
  text: string;
}

const AlertModal = (props: AlertModalProps) => {
  return <div class={styles.alert}>
    <div class={styles.alertContent}>
      <div class={styles.icon}><CheckIcon/></div>
      <div>{props.text}</div>
    </div>
  </div>
}
export default AlertModal;
