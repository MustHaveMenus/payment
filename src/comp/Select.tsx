import styles from './Select.module.scss';
import {For} from "solid-js";

interface SelectProps {
  values: any[]
}

const Select = (props: SelectProps) => {
  return <select class={styles.select}>
    <For each={props.values} fallback={<div>Loading...</div>}>
      {(item) => <option>{item}</option>}
    </For>
  </select>
}

export default Select;
