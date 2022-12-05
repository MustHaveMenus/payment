import styles from "./Agreement.module.scss";
import mobileState from "../state/mobile";

interface AgreementProps {

}

const Agreement = (props: AgreementProps) => {
  const {mobile} = mobileState;

  return <div classList={{[styles.agreement]: true, [styles.mobile]: mobile()}}>
          <span>By continuing, you agree to our <a href={'/menu/usagePolicy/view.do'} target={'_blank'}>Terms of Use</a>, confirm you have read our <a
            href={'/menu/privacyPolicy/view.do'} target={'_blank'}>Privacy Policy</a>, and agree to the recurring charges for your subscription plan until you cancel.</span>
  </div>
}
export default Agreement;
