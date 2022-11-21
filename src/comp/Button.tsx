import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return <button class={styles.button} onClick={props.onClick}>{props.label}</button>
}

export default Button;
