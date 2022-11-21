import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return <button class={`${styles.button} ${props.disabled ? styles.disabled : ''}`} onClick={props.onClick}>{props.label}</button>
}

export default Button;
