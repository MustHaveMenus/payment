import {View} from "../type/types";
import BenefitsModal from "./BenefitsModal";

export interface SetupProps {
  view: View
}

const Setup = ({view}: SetupProps) => {
  return <>
    {View.BENEFITS === view && <BenefitsModal/>}
  </>
}
export default Setup;
