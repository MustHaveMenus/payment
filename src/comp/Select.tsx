import styles from './Select.module.scss';
import {For} from "solid-js";
import {Option} from "../type/types";


interface SelectProps<T extends Option> {
  values: T[],
  value: T,
  disabledValues?: T[],
  onChange: (val: T) => void;
}

const Select = (props: SelectProps<Option>) => {
  return <select class={styles.select} onChange={(e) => props.onChange(props.values.find(it => it.value === (e.target as HTMLSelectElement).value)!)}>
    <For each={props.values} fallback={<div>Loading...</div>}>
      {(item) => <option selected={item === props.value} disabled={props.disabledValues?.includes(item)}>{item.label}</option>}
    </For>
  </select>
}

export default Select;
