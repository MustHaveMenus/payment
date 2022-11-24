import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  secondaryOutlined?: boolean;
}

const Button = (props: ButtonProps) => {
  return <button classList={{
    [styles.button]: true,
    [styles.disabled]: props.disabled,
    [styles.secondary]: props.secondary,
    [styles.secondaryOutlined]: props.secondaryOutlined,
  }} onClick={props.onClick}>{props.label}</button>
}

export default Button;
