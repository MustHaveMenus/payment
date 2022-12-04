import styles from './Select.module.scss';
import {For, Show} from "solid-js";
import {Option} from "../type/types";


interface SelectProps<T extends Option> {
  values: T[],
  value: T,
  disabledValues?: T[],
  onChange: (val: T) => void;
  errorMsg?: string;
}

const Select = (props: SelectProps<Option>) => {
  return <div>
    <select classList={{[styles.select]: true, [styles.error]: !!props.errorMsg}} onChange={(e) => props.onChange(props.values.find(it => it.name === (e.target as HTMLSelectElement).value)!)}>
      <For each={props.values} fallback={<div>Loading...</div>}>
        {(item) => <option selected={item?.id === props.value?.id}
                           disabled={props.disabledValues?.map(it => it?.id).includes(item?.id)}>{item?.name}</option>}
      </For>
    </select>
    <Show when={props.errorMsg} keyed>
      <span class={styles.errorMsg}>{props.errorMsg}</span>
    </Show>
  </div>
}

export default Select;
