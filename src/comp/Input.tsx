import styles from './Input.module.scss';

interface InputProps {
  value?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  onKeyUp?: (e: KeyboardEvent) => void;
  onChange?: (v: string) => void;
}

const Input = (props: InputProps) => {
  return <input class={styles.input} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} onKeyUp={e => {props.onKeyUp?.(e); props.onChange?.((e.target as HTMLInputElement).value)}} value={props.value || ''}/>
}

export default Input;
