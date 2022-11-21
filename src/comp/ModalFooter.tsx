import {JSXElement} from "solid-js";

interface ModalFooterProps {
  children?: JSXElement
}

const ModalFooter = ({children}: ModalFooterProps) => {
  return <div>{children}</div>
}
export default ModalFooter;
