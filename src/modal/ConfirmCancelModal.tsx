import styles from './ConfirmCancelModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import mobileState from "../state/mobile";
import {Index} from "solid-js";
import footerStyles from "../comp/ModalFooter.module.scss";
import {Decision} from "../type/types";
import WarningIcon from "../comp/svg/WarningIcon";

interface ConfirmCancelModalProps extends GenericModalProps {
  onDecision: (dec: Decision) => void;
}

const consequences = ['You\'ll lose access to your account', 'QR Codes, Online Menus and Links will be disabled', 'Your designs and content may be deleted'];

const ConfirmCancelModal = (props: ConfirmCancelModalProps) => {
  const {mobile} = mobileState;

  const cancelBtn = () => <Button label={'Confirm Cancellation'} secondary onClick={() => props.onDecision(Decision.CONFIRM_CANCEL)}/>;
  const backToAccountBtn = () => <Button label={'Back to Account'} secondaryOutlined onClick={() => props.onDecision(Decision.BACK_TO_ACCOUNT)}/>;

  const footer = <footer class={mobile() ? footerStyles.reactivateOverview : styles.footer}>
    {cancelBtn()}
    {backToAccountBtn()}
  </footer>;

  const modalFooter = () => mobile() ? footer : null;
  const leftSideFooter = () => !mobile() ? footer : null;

  const leftSideContent = <>
    <section class={styles.topSection}>
      <span class={styles.topHeader}>Cancel Subscription</span>
      <span class={styles.topSubheader}>Are you sure?</span>

      <div class={styles.consequences}>
        <Index each={consequences}>
          {(consequence) =>
            <div>
              <span><WarningIcon/></span>
              <span>{consequence()}</span>
            </div>
          }
        </Index>
      </div>
    </section>
  </>

  const desktopContent = () => mobile() ? null : <>
    <div class={styles.left}>
      {leftSideContent}
      {leftSideFooter()}
    </div>
    <div class={styles.right}></div>
  </>

  const mobileContent = () => !mobile() ? null : <>
    <div class={styles.right}></div>
    <div class={styles.left}>
      {leftSideContent}
      {leftSideFooter()}
    </div>
  </>

  return <Modal secondaryCloseBtn footer={modalFooter()} onBack={props.onBack} content={
    <div classList={{[styles.mobile]: mobile(), [styles.wrapper]: true}}>
      {desktopContent()}
      {mobileContent()}
    </div>
  }/>
}
export default ConfirmCancelModal;
