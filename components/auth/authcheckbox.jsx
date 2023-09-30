import styles from './authform.module.css';

const AuthCheckbox = ({ labelTrue, labelFalse, setValue, value }) => {
  return (
    <button
      type='button'
      className={styles.authcheckbox}
      onClick={() => {
        setValue(!value);
      }}>
      {value ? labelTrue : labelFalse}
    </button>
  );
};

export default AuthCheckbox;
