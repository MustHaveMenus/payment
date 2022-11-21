import {JSXElement} from "solid-js";

interface ModalHeaderProps {
  children?: JSXElement
}

const ModalHeader = ({children}: ModalHeaderProps) => {
  return <div>{children}</div>
}
export default ModalHeader;
