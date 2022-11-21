import {JSXElement} from "solid-js";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ModalWrapper from "./ModalWrapper";
import ModalContent from "./ModalContent";
import ModalContentWrapper from "./ModalContentWrapper";

interface ModalProps {
  header?: JSXElement,
  content?: JSXElement,
  footer?: JSXElement,
}

const Modal = ({header, footer, content}: ModalProps) => {
  return <ModalWrapper>
    <ModalContentWrapper>
      <ModalHeader>{header}</ModalHeader>
      <ModalContent>{content}</ModalContent>
      <ModalFooter>{footer}</ModalFooter>
    </ModalContentWrapper>
  </ModalWrapper>
}
export default Modal;
