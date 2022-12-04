import styles from './Modal.module.scss';
import {JSXElement, Show} from "solid-js";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalWrapper from "./ModalWrapper";
import ModalContent from "./ModalContent";
import ModalContentWrapper from "./ModalContentWrapper";
import loadingState from "../state/loading";
import {Spinner} from "./Spinner";
import {ViewType} from "../type/types";

export interface GenericModalProps {
  onBack?: () => void;
  onNext?: () => void;
  secondaryCloseBtn?: boolean;
}

interface ModalProps extends GenericModalProps {
  header?: JSXElement,
  content?: JSXElement,
  footer?: JSXElement,
}

export interface StepModalProps extends GenericModalProps {
  type: ViewType;
  idx: number;
}

const Modal = (props: ModalProps) => {
  const {loading} = loadingState;
  return <ModalWrapper>
    <ModalContentWrapper>
      <ModalHeader onBack={props.onBack} secondaryCloseBtn={props.secondaryCloseBtn}>{props.header}</ModalHeader>
      <ModalContent withFooter={!!props.footer} withHeader={!!props.header}>{props.content}</ModalContent>
      {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
      <Show when={loading()} keyed>
        <div class={styles.loadingOverlay}><Spinner/></div>
      </Show>
    </ModalContentWrapper>
  </ModalWrapper>
}
export default Modal;
