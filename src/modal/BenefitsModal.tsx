import styles from './BenefitsModal.module.scss';
import Modal from "../comp/Modal";

const BenefitsModal = () => {
  return <Modal content={
    <div class={styles.benefitsWrapper}>
      <div class={styles.leftSide}>
        <span>cacat</span>
      </div>
      <div class={styles.rightSide}></div>
    </div>
  }/>
}
export default BenefitsModal;
