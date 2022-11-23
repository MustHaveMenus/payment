import styles from './OverviewModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import ProIcon from "../comp/svg/ProIcon";
import DesignSetIcon from "../comp/svg/DesignSetIcon";
import DownloadIcon from "../comp/svg/DownloadIcon";
import QRIcon from "../comp/svg/QRIcon";
import TeamIcon from "../comp/svg/TeamIcon";
import HeartIcon from "../comp/svg/HeartIcon";
import Button from "../comp/Button";
import {mobileState} from "../state/state";

interface OverviewModalProps extends GenericModalProps {
}

const OverviewModal = (props: OverviewModalProps) => {
  const {mobile} = mobileState;
  const footer = <footer class={styles.footer}>
    <Button label={'Try it free for 30 days'} onClick={props.onNext}/>
  </footer>;

  const modalFooter = () => mobile() ? footer : null;
  const leftSideFooter = () => !mobile() ? footer : null;

  const leftSideContent = <>
    <header>
      <ProIcon/><span>Upgrade to use this feature</span>
    </header>
    <section class={styles.topSection}>
      <span class={styles.topHeader}>Try Pro for Free</span>
      <span class={styles.topSubheader}>The ultimate design tool for restaurants.</span>
    </section>
    <section class={styles.featureSection}>
      <span>Here's what's inside MustHaveMenus Pro:</span>

      <div class={styles.featureList}>
        <div>
          <span><DesignSetIcon/></span>
          <span><b>All template designs.</b> Unlock access to over 20,000 of the best restaurant marketing designs on the planet. Even use custom fonts and custom sizes.</span>
        </div>
        <div>
          <span><DownloadIcon/></span>
          <span><b>Unlimited downloads.</b> Get unlimited high-res and watermark-free downloads to use in your daily business and marketing.</span>
        </div>
        <div>
          <span><QRIcon/></span>
          <span><b>Unlimited views.</b> Connect your customers online with unlimited QR scans, menu views, link pages, social posts and more. All watermark-free.</span>
        </div>
        <div>
          <span><TeamIcon/></span>
          <span><b>Add your team and additional locations</b> for just $10/mo each.</span>
        </div>
        <div>
          <span><HeartIcon/></span>
          <span><b>Priority Customer Service</b></span>
        </div>
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

  return <Modal onClose={props.onClose} secondaryCloseBtn footer={modalFooter()} content={
    <div classList={{[styles.mobile]: mobile(), [styles.wrapper]: true}}>
      {desktopContent()}
      {mobileContent()}
    </div>
  }/>
}
export default OverviewModal;
