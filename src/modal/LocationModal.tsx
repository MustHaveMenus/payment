import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {createEffect, createSignal, For, onCleanup, onMount, Setter, Show} from "solid-js";
import Input from "../comp/Input";
import Select from "../comp/Select";
import locationsState from "../state/location";
import {countryValues, isNotEmpty, isValidLocation, stateValues} from "../util/util";
import {LocationDto} from "../generated/client";
import {DEFAULT_LOCATION, LOCATIONS} from "../util/constants";
import mobileState from "../state/mobile";
import TrashIcon from "../comp/svg/TrashIcon";
import generalStyles from "../style/general.module.scss";
import LocationCircleIcon from "../comp/svg/LocationCircleIcon";
import {Option} from "../type/types";

interface LocationModalProps extends GenericModalProps {
  secondary?: boolean;
  disallowSkip?: boolean;
}

const LocationModal = (props: LocationModalProps) => {
  const {mobile} = mobileState;
  const {
    locations,
    addLocation,
    updateName,
    updateCity,
    updateZip,
    updateAddress,
    updateAddress2,
    cleanInvalidLocations,
    deleteLocation,
    updateState,
    updateCountry
  } = locationsState;
  const [newLocations, setNewLocations] = createSignal([] as LocationDto[]);
  const [nextBtnDisabled, setNextBtnDisabled] = createSignal(true);
  const [addLocBtnDisabled, setAddLocBtnDisabled] = createSignal(true);
  const [nameErr, setNameErr] = createSignal([] as string[]);
  const [addressErr, setAddressErr] = createSignal([] as string[]);
  const [address2Err, setAddress2Err] = createSignal([] as string[]);
  const [cityErr, setCityErr] = createSignal([] as string[]);
  const [zipErr, setZipErr] = createSignal([] as string[]);
  const [stateErr, setStateErr] = createSignal([] as string[]);
  const [countryErr, setCountryErr] = createSignal([] as string[]);

  createEffect(() => {
    const locs = locations[LOCATIONS];
    if (!locs) return;
    setNewLocations(locs.filter(it => it.id === it.name));
  });

  onMount(() => {
    if (!newLocations().length) {
      addNewLocation();
    }
    validate();
  });
  onCleanup(cleanInvalidLocations);

  function addNewLocation() {
    addLocation(JSON.parse(JSON.stringify(DEFAULT_LOCATION)));
    validate();
  }

  function onDeleteLocation(loc: LocationDto) {
    deleteLocation(loc);
    validate();
  }

  function update(loc: LocationDto, e: KeyboardEvent | null, setter: Setter<string[]>, updateState: (value: string) => void) {
    const key = e?.key.toLowerCase();
    if (key === 'tab' || key === 'shift') return;
    const idx = locations[LOCATIONS].indexOf(loc);
    const value = (e?.target as HTMLInputElement)?.value ?? '';
    updateState(value);

    if (isNotEmpty(value)) {
      setErrorMessage(setter, idx, '');
    } else {
      setErrorMessage(setter, idx, 'Please complete this field.');
    }
    validate();
  }

  const validate = () => {
    let valid = true;
    locations[LOCATIONS].filter(it => it.id === it.name).forEach(loc => {
      if (!isValidLocation(loc)) {
        valid = false;
      }
    });
    setNextBtnDisabled(!valid);
    setAddLocBtnDisabled(!valid);
  }

  const onUpdateName = (loc: LocationDto, e: KeyboardEvent) => update(loc, e, setNameErr, (value: string) => updateName(loc, value, true));
  const onUpdateAddress = (loc: LocationDto, e: KeyboardEvent) => update(loc, e, setAddressErr, (value: string) => updateAddress(loc, value));
  const onUpdateAddress2 = (loc: LocationDto, e: KeyboardEvent) => update(loc, e, setAddress2Err, (value: string) => updateAddress2(loc, value));
  const onUpdateCity = (loc: LocationDto, e: KeyboardEvent) => update(loc, e, setCityErr, (value: string) => updateCity(loc, value));
  const onUpdateZip = (loc: LocationDto, e: KeyboardEvent) => update(loc, e, setZipErr, (value: string) => updateZip(loc, value));
  const onUpdateState = (loc: LocationDto, v: Option) => update(loc, null, setStateErr, () => updateState(loc, v.name!));
  const onUpdateCountry = (loc: LocationDto, v: Option) => update(loc, null, setCountryErr, () => updateCountry(loc, v.name!));

  function setErrorMessage(setter: Setter<string[]>, idx: number, value: string) {
    setter(old => {
      const temp = [...old];
      temp[idx] = value;
      return temp;
    });
  }

  return <Modal onBack={props.onBack}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}><Show when={props.secondary} keyed><LocationCircleIcon/></Show>Add Locations</span>
                    <Show when={props.secondary} keyed fallback={<>
                      <span class={headerStyles.subheader}>Manage all your storefronts and brands from a single account.</span>
                      <span
                        class={headerStyles.subheader}>Try it free for 30 days. Only ${locationPricePerMonth}/month per location after that.</span>
                    </>}>
                      <span
                        class={headerStyles.subheader}>Manage all your storefronts and brands from a single account. Add locations for only ${locationPricePerMonth}/month.</span>
                    </Show>
                  </div>
                }
                content={
                  <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
                    <div class={styles.form}>
                      <For each={newLocations()}>{(loc, i) =>
                        <div class={styles.entry}>
                          <div class={styles.formHeader}>
                            <span>Location Info</span>
                            <span class={`${i() === 0 ? generalStyles.invisible : ''}`} onClick={() => onDeleteLocation(loc)}>
                                <TrashIcon/>
                              </span>
                          </div>

                          <div class={styles.formContent}>
                            <Input type={'text'} value={loc.name} placeholder={'Business Name'} errorMsg={nameErr()[i()]}
                                   onKeyUp={(e) => onUpdateName(loc, e)}/>
                            <div class={styles.split}>
                              <Input type={'text'} value={loc.address} placeholder={'Street Address 1'} errorMsg={addressErr()[i()]}
                                     onKeyUp={(e) => onUpdateAddress(loc, e)}/>
                              <Input type={'text'} value={loc.address2} placeholder={'Street Address 2'} errorMsg={address2Err()[i()]}
                                     onKeyUp={(e) => onUpdateAddress2(loc, e)}/>
                            </div>
                            <div class={styles.split}>
                              <Input type={'text'} value={loc.city} placeholder={'City'} errorMsg={cityErr()[i()]}
                                     onKeyUp={(e) => onUpdateCity(loc, e)}/>
                              <Select values={stateValues} value={{id: (loc.state ?? ''), name: (loc.state ?? '')}} errorMsg={stateErr()[i()]}
                                      onChange={v => onUpdateState(loc, v)}/>
                            </div>
                            <div class={styles.split}>
                              <Select values={countryValues} onChange={v => onUpdateCountry(loc, v)} errorMsg={countryErr()[i()]}
                                      value={{id: (loc.country ?? ''), name: (loc.country ?? '')}}/>
                              <Input type={'text'} value={loc.zip} placeholder={'Zip'} errorMsg={zipErr()[i()]}
                                     onKeyUp={(e) => onUpdateZip(loc, e)}/>
                            </div>
                          </div>
                        </div>
                      }</For>
                      <div class={styles.addLocationBtnWrapper}>
                        <Button label={'+ Add Another Location'} disabled={addLocBtnDisabled()} onClick={addNewLocation}/>
                      </div>
                    </div>
                  </div>
                }
                footer={
                  <div classList={{[footerStyles.borderedFooter]: true, [footerStyles.secondary]: props.secondary}}>
                    <Button onClick={props.onNext} disabled={nextBtnDisabled()} label={'Next'}></Button>
                    <Show when={!props.disallowSkip} keyed>
                      <span onClick={props.onNext}>Skip this step {'>'}</span>
                    </Show>
                  </div>
                }/>
}
export default LocationModal;
