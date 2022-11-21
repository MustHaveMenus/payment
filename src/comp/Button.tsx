import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({label, onClick}: ButtonProps) => {
  return <button class={styles.button} onClick={onClick}>{label}</button>
}

export default Button;
