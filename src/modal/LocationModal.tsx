import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {createEffect, createSignal, For, Show} from "solid-js";
import Input from "../comp/Input";
import Select from "../comp/Select";
import locationsState from "../state/location";
import {countryValues, stateValues} from "../util/util";
import {LocationDto} from "../generated/client";
import {LOCATIONS} from "../util/constants";

interface LocationModalProps extends GenericModalProps {
}

const LocationModal = (props: LocationModalProps) => {
  const {locations, addLocation} = locationsState;
  const [currentLocation, setCurrentLocation] = createSignal({} as LocationDto);
  const [state, setState] = createSignal('');
  const [country, setCountry] = createSignal('');
  const [newLocations, setNewLocations] = createSignal([] as LocationDto[]);

  createEffect(() => {
    const locs = locations[LOCATIONS];
    if (!locs) return;
    setNewLocations(locs.filter(it => it.id === it.name));
  })

  function validateAndProceed() {
    props.onNext?.();
  }

  function onNameChange(e: KeyboardEvent) {
    setCurrentLocation(old => {
      return {
        ...old,
        name: (e.target as HTMLInputElement).value
      }
    });
  }

  function onStateChange() {

  }

  function onCountryChange() {

  }

  function onZipChange() {

  }

  function newLocation() {
    return {} as LocationDto;
  }

  function addNewLocation() {
    addLocation({
      ...currentLocation(),
      id: currentLocation().name
    });
    setCurrentLocation(newLocation());
  }

  return <Modal
    header={
      <div class={headerStyles.wrapper}>
        <span class={headerStyles.header}>Add Locations</span>
        <span class={headerStyles.subheader}>Manage all your storefronts and brands from a single account.</span>
        <span class={headerStyles.subheader}>Try it free for 30 days. Only ${locationPricePerMonth}/month per location after that.</span>
      </div>
    }
    content={
      <div class={styles.wrapper}>
        <div class={styles.form}>
          <div class={styles.formHeader}>
            <span>Location Info</span>
          </div>

          <div class={styles.formContent}>
            <Input type={'text'} value={currentLocation().name} placeholder={'Business Name'} onKeyUp={onNameChange}/>
            <div class={styles.split}>
              <Input type={'text'} value={''} placeholder={'Street Address 1'} onKeyUp={onNameChange}/>
              <Input type={'text'} value={''} placeholder={'Street Address 2'} onKeyUp={onNameChange}/>
            </div>
            <div class={styles.split}>
              <Input type={'text'} value={''} placeholder={'City'} onKeyUp={onNameChange}/>
              <Select values={stateValues} value={{id: (state() ?? ''), name: (state() ?? '')}} onChange={onStateChange}/>
            </div>
            <div class={styles.split}>
              <Select values={countryValues} onChange={onCountryChange} value={{id: (country() ?? ''), name: (country() ?? '')}}/>
              <Input type={'text'} value={''} placeholder={'Zip'} onKeyUp={onZipChange}/>
            </div>
          </div>
        </div>

        <div class={styles.form}>
          <Show when={newLocations().length} keyed>
            <div class={styles.formHeader}>
              <span>Location Info</span>
            </div>
            <div class={styles.formContent}>
              <For each={newLocations()}>{(loc, i) =>
                <div>{loc.name}</div>
              }</For>
            </div>
          </Show>
          <Button class={styles.addLocation} label={'+ Add Another Location'} onClick={addNewLocation}/>
        </div>
      </div>
    }
    footer={
      <div class={footerStyles.teamFooter}>
        <Button onClick={validateAndProceed} label={'Next'}></Button>
        <span onClick={props.onNext}>Skip this step {'>'}</span>
      </div>
    }/>
}
export default LocationModal;
