import styles from './PauseModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import mobileState from "../state/mobile";
import footerStyles from "../comp/ModalFooter.module.scss";
import Button from "../comp/Button";
import {Decision, DecisionParams} from "../type/types";
import Select from "../comp/Select";
import {pauseValues} from "../util/util";
import {createSignal} from "solid-js";
import FormattedDate from "../comp/FormattedDate";

interface PauseModalProps extends GenericModalProps {
  pauseDate: Date
  onDecision: (dec: Decision, params?: DecisionParams) => void;
}

const PauseModal = (props: PauseModalProps) => {
  const {mobile} = mobileState;
  const [pausePeriod, setPausePeriod] = createSignal(pauseValues[0]);


  const cancelBtn = () => <Button label={'Pause Subscription'} secondary onClick={() => props.onDecision(Decision.CONFIRM_PAUSE, {period: parseInt(pausePeriod().id || '0')})}/>;
  const backToAccountBtn = () => <Button label={'Cancel Subscription'} secondaryOutlined onClick={() => props.onDecision(Decision.CANCEL)}/>;

  const footer = <footer class={mobile() ? footerStyles.reactivateOverview : styles.footer}>
    {cancelBtn()}
    {backToAccountBtn()}
  </footer>;

  const modalFooter = () => mobile() ? footer : null;
  const leftSideFooter = () => !mobile() ? footer : null;

  const leftSideContent = <>
    <section class={styles.topSection}>
      <span class={styles.topHeader}>Pause Subscription</span>
      <span class={styles.topSubheader} style={{"margin-top": '12px'}}>Need to take a break? No problem!</span>
      <span class={styles.topSubheader}>Pause will take effect on <FormattedDate date={props.pauseDate}/></span>

      <div class={styles.pausePeriod} style={{"margin-top": '32px'}}>
        <span>Pause for</span>
        <Select values={pauseValues} value={pausePeriod()} onChange={(val) => setPausePeriod(val)}/>
      </div>

      <span class={styles.topSubheader} style={{"margin-top": '28px'}}><b>Billing will resume automatically after the paused period.</b></span>
      <span class={styles.topSubheader} style={{"margin-top": '28px'}}>Your QR codes and online content will be disabled while your account is paused.</span>
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
export default PauseModal;
