import styles from './formselect.module.css';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';

const FormSelect = ({ children, error, label, name, placeholder, register, required, title }) => {
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
      <span className={`${isClick ? styles.selectWrapperNoFocus : styles.selectWrapper}`}>
        <select
          aria-label={placeholder}
          aria-required={required}
          className={`${styles.select} ${theme.mod === 'light' ? '' : styles.inverted}`}
          name={name}
          title={title}
          {...register}>
          {children}
        </select>
      </span>
      {error && error.message.length > 1 && (
        <span className={styles.labelTextError}>{error.message}</span>
      )}
    </label>
  );
};

export default FormSelect;
