import styles from './App.module.scss';
import mega from '../assets/mega.png'
import SvgArr from "./svg/SvgArr";

export interface AppProps {
  param: string,
  onClose: () => void;
}

const App = ({param, onClose}: AppProps) => {
  return <div class={styles.wrapper}>
    Test si <span class={styles.wrapperSpan}>{param}</span>
    <img src={mega} alt={''}/>
    <SvgArr/>
    <button onClick={onClose}>Close</button>
  </div>
}

export default App;
