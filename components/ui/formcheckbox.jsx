import styles from './formcheckbox.module.css';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';

const FormCheckbox = ({
  error,
  label,
  name,
  placeholder,
  register,
  required,
  title,
  val,
  valTrue,
  valFalse,
}) => {
  const { theme } = useSettings();
  const [isClick, setIsClick] = useState(true);
  return (
    <label
      onClick={() => {
        setIsClick(true);
      }}
      onBlur={() => {
        setIsClick(false);
      }}>
      <span className={styles.labelText}>{label}</span>
      <span className={`${isClick ? styles.checkboxWrapperNoFocus : styles.checkboxWrapper}`}>
        <input
          autoComplete="off"
          aria-label={placeholder}
          aria-required={required}
          className={`${styles.input} ${theme.mod === 'light' ? '' : styles.inverted}`}
          name={name}
          title={title}
          type="checkbox"
          checked={val}
          {...register}
        />
        {error && error.message.length > 1 ? (
          <span className={styles.labelTextError}>{error.message}</span>
        ) : (
          <span className={styles.labelTextTip} aria-hidden="true">
            {val === true ? valTrue : valFalse}
          </span>
        )}
      </span>
    </label>
  );
};

export default FormCheckbox;
