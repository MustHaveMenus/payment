import styles from './OverviewReactivateModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import mobileState from "../state/mobile";
import {createEffect, createSignal, Show} from "solid-js";
import footerStyles from "../comp/ModalFooter.module.scss";
import {Decision} from "../type/types";
import {SubStatusDto} from "../generated/client";
import {getDaysUntil} from "../util/util";

interface OverviewReactivateModalProps extends GenericModalProps {
  onDecision: (dec: Decision) => void;
  status: SubStatusDto;
}

const OverviewReactivateModal = (props: OverviewReactivateModalProps) => {
  const [daysLeftUntilReactivate, setDaysLeftUntilReactivate] = createSignal(0);
  const {mobile} = mobileState;

  createEffect(() => {
    if (!props || !props.status) return;
    setDaysLeftUntilReactivate(getDaysUntil(props.status.pauseEndDate || new Date()));
  });

  const cancelBtn = () => <Button label={'Cancel Account'} secondaryOutlined onClick={() => props.onDecision(Decision.CANCEL)}/>;
  const reactivateBtn = () => <Button label={'Reactivate Now'} secondary onClick={() => props.onDecision(Decision.REACTIVATE)}/>;

  const footer = <footer class={mobile() ? footerStyles.reactivateOverview : styles.footer}>
    {mobile() && <>
      {reactivateBtn()}
      {cancelBtn()}
    </>}
    {!mobile() && <>
      {cancelBtn()}
      {reactivateBtn()}
    </>}
  </footer>;

  const modalFooter = () => mobile() ? footer : null;
  const leftSideFooter = () => !mobile() ? footer : null;

  const leftSideContent = <>
    <section class={styles.topSection}>
      <span class={styles.topHeader}>Welcome Back!</span>
      <span class={styles.topSubheader}>Your subscription has been <b>paused</b>.</span>
      <Show when={daysLeftUntilReactivate() > 0} keyed>
        <span class={styles.topSubheader}>You have {daysLeftUntilReactivate()} days left until it gets automatically reactivated.</span>
      </Show>
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

  return <Modal secondaryCloseBtn footer={modalFooter()} content={
    <div classList={{[styles.mobile]: mobile(), [styles.wrapper]: true}}>
      {desktopContent()}
      {mobileContent()}
    </div>
  }/>
}
export default OverviewReactivateModal;
