import {JSXElement} from "solid-js";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalWrapper from "./ModalWrapper";
import ModalContent from "./ModalContent";
import ModalContentWrapper from "./ModalContentWrapper";

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

const Modal = (props: ModalProps) => {
  return <ModalWrapper>
    <ModalContentWrapper>
      <ModalHeader onBack={props.onBack} secondaryCloseBtn={props.secondaryCloseBtn}>{props.header}</ModalHeader>
      <ModalContent withFooter={!!props.footer} withHeader={!!props.header}>{props.content}</ModalContent>
      {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
    </ModalContentWrapper>
  </ModalWrapper>
}
export default Modal;
