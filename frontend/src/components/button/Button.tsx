import styles from './button.module.css';

interface ButtonProps {
  text: string;
}

export function Button({ text }: ButtonProps) {
  return (
    <button className={styles.button} type="submit">{text}</button>
  );
}
