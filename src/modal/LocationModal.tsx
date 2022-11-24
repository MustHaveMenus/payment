import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {createEffect, createSignal, For, onCleanup, onMount} from "solid-js";
import Input from "../comp/Input";
import Select from "../comp/Select";
import locationsState from "../state/location";
import {countryValues, stateValues} from "../util/util";
import {LocationDto} from "../generated/client";
import {LOCATIONS} from "../util/constants";
import mobileState from "../state/mobile";
import TrashIcon from "../comp/svg/TrashIcon";
import generalStyles from "../style/general.module.scss";

interface LocationModalProps extends GenericModalProps {
}

const LocationModal = (props: LocationModalProps) => {
  const {mobile} = mobileState;
  const {locations, addLocation, updateName, updateCity, updateZip, updateAddress, updateAddress2, cleanInvalidLocations, deleteLocation} = locationsState;
  const [newLocations, setNewLocations] = createSignal([] as LocationDto[]);

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

  function onStateChange() {

  }

  function onCountryChange() {

  }

  function addNewLocation() {
    addLocation({});
  }

  return <Modal onBack={props.onBack}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}>Add Locations</span>
                    <span class={headerStyles.subheader}>Manage all your storefronts and brands from a single account.</span>
                    <span class={headerStyles.subheader}>Try it free for 30 days. Only ${locationPricePerMonth}/month per location after that.</span>
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
                              <Select values={stateValues} value={{id: (loc.state ?? ''), name: (loc.state ?? '')}} onChange={onStateChange}/>
                            </div>
                            <div class={styles.split}>
                              <Select values={countryValues} onChange={onCountryChange} value={{id: (loc.country ?? ''), name: (loc.country ?? '')}}/>
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
                  <div class={footerStyles.borderedFooter}>
                    <Button onClick={validateAndProceed} label={'Next'}></Button>
                    <span onClick={props.onNext}>Skip this step {'>'}</span>
                  </div>
                }/>
}
export default LocationModal;
