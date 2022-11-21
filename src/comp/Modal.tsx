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
}

interface ModalProps extends GenericModalProps {
  header?: JSXElement,
  content?: JSXElement,
  footer?: JSXElement,
}

const Modal = ({header, footer, content, onBack, onClose}: ModalProps) => {
  return <ModalWrapper onClose={onClose}>
    <ModalContentWrapper>
      <ModalHeader onBack={onBack} onClose={onClose}>{header}</ModalHeader>
      <ModalContent>{content}</ModalContent>
      <ModalFooter>{footer}</ModalFooter>
    </ModalContentWrapper>
  </ModalWrapper>
}
export default Modal;
