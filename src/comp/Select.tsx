import styles from './Select.module.scss';
import {For} from "solid-js";

interface SelectProps<T> {
  values: T[],
  value: T,
  disabledValues?: T[],
  onChange: (val: T) => void;
}

const Select = (props: SelectProps<any>) => {
  return <select class={styles.select} onChange={(e) => props.onChange((e.target as HTMLSelectElement).value)}>
    <For each={props.values} fallback={<div>Loading...</div>}>
      {(item) => <option selected={item === props.value} disabled={props.disabledValues?.includes(item)}>{item}</option>}
    </For>
  </select>
}

export default Select;
