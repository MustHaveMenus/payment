import styles from './Input.module.scss';

interface InputProps {
  value?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  onKeyUp?: (e: KeyboardEvent) => void;
}

const Input = (props: InputProps) => {
  return <input class={styles.input} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} onKeyUp={props.onKeyUp} value={props.value || ''}/>
}

export default Input;
