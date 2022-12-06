import styles from './Input.module.scss';
import {onMount, Show} from "solid-js";

interface InputProps {
  value?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  onKeyUp?: (e: KeyboardEvent) => void;
  onChange?: (v: string) => void;
  onInputChange?: (v: string) => void;
  errorMsg?: string;
  onAutocomplete?: (value: string, addrComponents: any[]) => void;
}

const Input = (props: InputProps) => {
  let inputRef: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined = undefined;
  onMount(() => {
    if (!!props.onAutocomplete) {
      // @ts-ignore
      const autocomplete = new google.maps.places.Autocomplete(inputRef);

      autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        props.onAutocomplete?.(place.formatted_address, place.address_components);
      });
    }
  });

  return <div class={styles.inputWrapper}>
    <input ref={inputRef} classList={{[styles.input]: true, [styles.error]: !!props.errorMsg}} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} onKeyUp={e => {props.onKeyUp?.(e); props.onChange?.((e.target as HTMLInputElement).value)}} value={props.value || ''} onChange={e => props.onInputChange?.((e.target as HTMLInputElement).value)}/>
    <Show when={props.errorMsg} keyed>
      <span class={styles.errorMsg}>{props.errorMsg}</span>
    </Show>
  </div>
}

export default Input;
