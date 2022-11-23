import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {createSignal} from "solid-js";
import Input from "../comp/Input";
import Select from "../comp/Select";
import {Countries, States} from "../util/countries";
import locationState from "../state/location";

interface LocationModalProps extends GenericModalProps {
}

const LocationModal = (props: LocationModalProps) => {
  const {locations, setLocations} = locationState;
  const [state, setState] = createSignal('');
  const [country, setCountry] = createSignal('');

  function validateAndProceed() {

  }

  function onNameChange(e: KeyboardEvent) {

  }

  function onStateChange() {

  }

  function onCountryChange() {

  }

  function onZipChange() {

  }

  function addNewLocation() {

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
            <Input type={'text'} value={''} placeholder={'Business Name'} onKeyUp={onNameChange}/>
            <div class={styles.split}>
              <Input type={'text'} value={''} placeholder={'Street Address 1'} onKeyUp={onNameChange}/>
              <Input type={'text'} value={''} placeholder={'Street Address 2'} onKeyUp={onNameChange}/>
            </div>
            <div class={styles.split}>
              <Input type={'text'} value={''} placeholder={'City'} onKeyUp={onNameChange}/>
              <Select values={Object.keys(States)} value={state()} onChange={onStateChange}/>
            </div>
            <div class={styles.split}>
              <Select values={Countries} onChange={onCountryChange} value={country()}/>
              <Input type={'text'} value={''} placeholder={'Zip'} onKeyUp={onZipChange}/>
            </div>
          </div>

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
