import styles from './RadioInput.module.scss';

interface RadioInputProps {
  value?: string;
  name?: string;
  id?: string;
  defaultChecked?: boolean;
}

const RadioInput = (props: RadioInputProps) => {
  return <input class={styles.radio} type="radio" name={props.name} id={props.id} value={props.value} checked={props.defaultChecked}/>
}

export default RadioInput;
