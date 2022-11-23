import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";
import {locationState, teamState} from "../state/state";
import {USERS} from "../util/constants";
import {createEffect} from "solid-js";

interface LocationModalProps extends GenericModalProps {
}

const LocationModal = (props: LocationModalProps) => {
  const [state, setState] = teamState;
  const {locations, setLocations} = locationState;

  createEffect(() => {
    console.log(state[USERS].at(0));
  })

  function validateAndProceed() {

  }

  return <Modal onClose={props.onClose}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}>Add Locations</span>
                    <span class={headerStyles.subheader}>Manage all your storefronts and brands from a single account.</span>
                    <span class={headerStyles.subheader}>Try it free for 30 days. Only ${locationPricePerMonth}/month per location after that.</span>
                  </div>
                }
                content={
                  <div class={styles.wrapper}>
                    content {state[USERS].at(0)?.email} {locations().at(0)}
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
