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
  useAutocomplete?: boolean;
}

const Input = (props: InputProps) => {
  let inputRef: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined = undefined;
  // onMount(() => {
  //   // @ts-ignore
  //   const autocomplete = new google.maps.places.Autocomplete(inputRef);
  //
  //   autocomplete.addListener('place_changed', function () {
  //     const place = autocomplete.getPlace();
  //     console.log(place);
  //   });
  // });
  // function updateAddress(value?: string, addressComponents?: any[]) {
  //   if (addressComponents && addressComponents.length > 0) {
  //     addressComponents.forEach((addressComponent) => {
  //       if (addressComponent.types.find((type: string) => type === "country")) {
  //         const countryName =
  //           addressComponent.long_name === "United States"
  //             ? UnitedStates
  //             : addressComponent.long_name;
  //         setCountry(countryName);
  //       }
  //       if (
  //         addressComponent.types.find(
  //           (type: string) => type === "administrative_area_level_1"
  //         )
  //       ) {
  //         setState(addressComponent.long_name);
  //       }
  //       if (
  //         addressComponent.types.find((type: string) => type === "locality")
  //       ) {
  //         setCity(addressComponent.long_name);
  //       }
  //       if (addressComponent.types.find((type: string) => type === "route")) {
  //         const streetNo =
  //           addressComponents[0].types[0] === "street_number"
  //             ? addressComponents[0].long_name
  //             : "";
  //         setAddress(
  //           streetNo !== ""
  //             ? `${streetNo} ${addressComponent.long_name}`
  //             : addressComponent.long_name
  //         );
  //       }
  //       if (
  //         addressComponent.types.find((type: string) => type === "postal_code")
  //       ) {
  //         setZip(addressComponent.long_name);
  //       }
  //     });
  //   } else {
  //     setAddress(value || "");
  //   }
  // }
  return <div class={styles.inputWrapper}>
    <input ref={inputRef} classList={{[styles.input]: true, [styles.error]: !!props.errorMsg}} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} onKeyUp={e => {props.onKeyUp?.(e); props.onChange?.((e.target as HTMLInputElement).value)}} value={props.value || ''} onChange={e => props.onInputChange?.((e.target as HTMLInputElement).value)}/>
    <Show when={props.errorMsg} keyed>
      <span class={styles.errorMsg}>{props.errorMsg}</span>
    </Show>
  </div>
}

export default Input;
