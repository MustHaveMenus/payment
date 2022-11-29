import styles from './AlertModal.module.scss';
import CheckIcon from "./svg/CheckIcon";
import {Show} from "solid-js";
import WarningIcon from "./svg/WarningIcon";

export interface AlertModalProps {
  text: string;
  error?: boolean;
  duration?: number;
}

const AlertModal = (props: AlertModalProps) => {
  return <div classList={{[styles.alert]: true, [styles.error]: props.error}}>
    <div class={styles.alertContent}>
      <div class={styles.icon}>
        <Show when={props.error} keyed fallback={<CheckIcon/>}><WarningIcon/></Show>
      </div>
      <div>{props.text}</div>
    </div>
  </div>
}
export default AlertModal;
