import {JSXElement} from "solid-js";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalWrapper from "./ModalWrapper";
import ModalContent from "./ModalContent";
import ModalContentWrapper from "./ModalContentWrapper";

export interface GenericModalProps {
  onBack?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  secondaryCloseBtn?: boolean;
  mobile?: boolean;
}

interface ModalProps extends GenericModalProps {
  header?: JSXElement,
  content?: JSXElement,
  footer?: JSXElement,
}

const Modal = (props: ModalProps) => {
  return <ModalWrapper onClose={props.onClose}>
    <ModalContentWrapper mobile={props.mobile}>
      <ModalHeader onBack={props.onBack} onClose={props.onClose} secondaryCloseBtn={props.secondaryCloseBtn}>{props.header}</ModalHeader>
      <ModalContent>{props.content}</ModalContent>
      {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
    </ModalContentWrapper>
  </ModalWrapper>
}
export default Modal;
