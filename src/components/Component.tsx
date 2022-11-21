import styles from './Component.module.scss';
import mega from '../assets/mega.png'
import SvgArr from "./svg/SvgArr";

export interface ComponentProps {
  param: string
}

const Component = ({param}: ComponentProps) => {
  return <div class={styles.div}>
    Test <span class={styles.span}>{param}</span>
    <img src={mega} alt={''}/>
    <SvgArr/>
  </div>
}

export default Component;
