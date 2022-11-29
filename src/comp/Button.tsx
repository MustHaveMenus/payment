import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  secondaryOutlined?: boolean;
}

const Button = (props: ButtonProps) => {
  function onClick() {
    if (!props.disabled) {
      props.onClick?.();
    }
  }
  return <button classList={{
    [styles.button]: true,
    [styles.disabled]: props.disabled,
    [styles.secondary]: props.secondary,
    [styles.secondaryOutlined]: props.secondaryOutlined,
  }} onClick={onClick}>{props.label}</button>
}

export default Button;
