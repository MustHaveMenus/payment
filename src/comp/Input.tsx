import styles from './Input.module.scss';
import {Show} from "solid-js";

interface InputProps {
  value?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  onKeyUp?: (e: KeyboardEvent) => void;
  onChange?: (v: string) => void;
  onInputChange?: (v: string) => void;
  errorMsg?: string;
}

const Input = (props: InputProps) => {
  return <div class={styles.inputWrapper}>
    <input classList={{[styles.input]: true, [styles.error]: !!props.errorMsg}} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} onKeyUp={e => {props.onKeyUp?.(e); props.onChange?.((e.target as HTMLInputElement).value)}} value={props.value || ''} onChange={e => props.onInputChange?.((e.target as HTMLInputElement).value)}/>
    <Show when={props.errorMsg} keyed>
      <span class={styles.errorMsg}>{props.errorMsg}</span>
    </Show>
  </div>
}

export default Input;
