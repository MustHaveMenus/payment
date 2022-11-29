import styles from './RadioInput.module.scss';

interface RadioInputProps {
  value?: string;
  name?: string;
  id?: string;
  defaultChecked?: boolean;
  onChange: (value: string) => void;
}

const RadioInput = (props: RadioInputProps) => {
  return <input class={styles.radio} type="radio" name={props.name} id={props.id} value={props.value} checked={props.defaultChecked} onChange={() => props.onChange(props.value!)}/>
}

export default RadioInput;
