import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {createEffect, createSignal, For, onCleanup, onMount, Show} from "solid-js";
import Input from "../comp/Input";
import Select from "../comp/Select";
import locationsState from "../state/location";
import {countryValues, stateValues} from "../util/util";
import {LocationDto} from "../generated/client";
import {LOCATIONS} from "../util/constants";
import mobileState from "../state/mobile";
import TrashIcon from "../comp/svg/TrashIcon";
import generalStyles from "../style/general.module.scss";
import LocationCircleIcon from "../comp/svg/LocationCircleIcon";

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
  const [btnDisabled, setBtnDisabled] = createSignal(true);

  createEffect(() => {
    const locs = locations[LOCATIONS];
    if (!locs) return;
    setNewLocations(locs.filter(it => it.id === it.name));
  });

  onMount(addNewLocation);
  onCleanup(cleanInvalidLocations);

  function validateAndProceed() {
    props.onNext?.();
  }

  function addNewLocation() {
    addLocation({});
  }

  createEffect(() => {
    console.log(locations);
  });

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
                            <span class={`${i() === 0 ? generalStyles.invisible : ''}`} onClick={[deleteLocation, loc]}>
                                <TrashIcon/>
                              </span>
                          </div>

                          <div class={styles.formContent}>
                            <Input type={'text'} value={loc.name} placeholder={'Business Name'}
                                   onKeyUp={(e) => updateName(loc, (e.target as HTMLInputElement)?.value ?? '', true)}/>
                            <div class={styles.split}>
                              <Input type={'text'} value={loc.address} placeholder={'Street Address 1'}
                                     onKeyUp={(e) => updateAddress(loc, (e.target as HTMLInputElement)?.value ?? '')}/>
                              <Input type={'text'} value={loc.address2} placeholder={'Street Address 2'}
                                     onKeyUp={(e) => updateAddress2(loc, (e.target as HTMLInputElement)?.value ?? '')}/>
                            </div>
                            <div class={styles.split}>
                              <Input type={'text'} value={loc.city} placeholder={'City'}
                                     onKeyUp={(e) => updateCity(loc, (e.target as HTMLInputElement)?.value ?? '')}/>
                              <Select values={stateValues} value={{id: (loc.state ?? ''), name: (loc.state ?? '')}} onChange={v => updateState(loc, v.name!)}/>
                            </div>
                            <div class={styles.split}>
                              <Select values={countryValues} onChange={v => updateCountry(loc, v.name!)} value={{id: (loc.country ?? ''), name: (loc.country ?? '')}}/>
                              <Input type={'text'} value={''} placeholder={'Zip'}
                                     onKeyUp={(e) => updateZip(loc, (e.target as HTMLInputElement)?.value ?? '')}/>
                            </div>
                          </div>
                        </div>
                      }</For>
                      <div class={styles.addLocationBtnWrapper}>
                        <Button label={'+ Add Another Location'} onClick={addNewLocation}/>
                      </div>
                    </div>
                  </div>
                }
                footer={
                  <div classList={{[footerStyles.borderedFooter]: true, [footerStyles.secondary]: props.secondary }}>
                    <Button onClick={validateAndProceed} disabled={btnDisabled()} label={'Next'}></Button>
                    <Show when={!props.disallowSkip} keyed>
                      <span onClick={props.onNext}>Skip this step {'>'}</span>
                    </Show>
                  </div>
                }/>
}
export default LocationModal;
