import styles from './ModalHeader.module.scss';
import generalStyles from '../style/general.module.scss';
import {JSXElement} from "solid-js";
import {GenericModalProps} from "./Modal";
import CloseIcon from "./svg/CloseIcon";
import BackIcon from "./svg/BackIcon";
import openState from "../state/open";
import mobileState from "../state/mobile";
import viewState from "../state/view";
import {View} from "../type/types";

interface ModalHeaderProps extends GenericModalProps {
  children?: JSXElement,
}

const ModalHeader = (props: ModalHeaderProps) => {
  const {closeModal} = openState;
  const {mobile} = mobileState;
  const {view} = viewState;

  return <div classList={{[styles.headerWrapper]: true, [styles.mobile]: mobile(), [styles.payment]: (view() === View.PAYMENT || view() === View.PAYMENT_REACTIVATE)}}>
    <div classList={{[styles.back]: true, [generalStyles.invisible]: !props.onBack}} onClick={props.onBack}><BackIcon/></div>
    {props.children}
    <div classList={{[styles.close]: true, [styles.closeSecondary]: props.secondaryCloseBtn}} onClick={closeModal}><CloseIcon/></div>
  </div>
}
export default ModalHeader;
