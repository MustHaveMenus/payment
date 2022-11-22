import styles from './LocationModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {locationPricePerMonth} from "../util/prices";

interface LocationModalProps extends GenericModalProps {
}

const LocationModal = (props: LocationModalProps) => {
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
                    content
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
