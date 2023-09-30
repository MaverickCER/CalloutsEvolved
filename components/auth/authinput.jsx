import styles from './authform.module.css';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';

const AuthInput = ({
  autoComplete,
  btn,
  btnAction,
  error,
  label,
  name,
  placeholder,
  register,
  required,
  tag,
  title,
  type,
  val,
}) => {
  const { theme } = useSettings();
  const [isClick, setIsClick] = useState(true);
  const [isAutoFill, setIsAutoFill] = useState(false);
  return (
    <label
      className={styles.label}
      onClick={() => {
        setIsClick(true);
      }}
      onBlur={() => {
        setIsClick(false);
      }}>
      <span className={styles.labelText}>{label}</span>
      <span
        className={`${
          (btn && btnAction) || tag
            ? isClick
              ? styles.inputGuildWrapperNoFocus
              : styles.inputGuildWrapper
            : isClick
            ? styles.inputSingleWrapperNoFocus
            : styles.inputSingleWrapper
        }`}>
        <input
          type={type}
          name={name}
          aria-label={placeholder}
          aria-required={required}
          title={title}
          className={`${styles.input} ${theme.mod === 'light' ? '' : styles.inverted}`}
          autoComplete={autoComplete}
          onAnimationEnd={() => {
            setIsAutoFill(true);
          }}
          {...register}
        />
        {btn && btnAction ? (
          btnAction === 'submit' ? (
            <button
              type="submit"
              aria-label="toggle password visibility"
              tabIndex="-1"
              className={styles.labelButton}>
              {btn}
            </button>
          ) : (
            <span
              aria-label="toggle password visibility"
              className={styles.labelButton}
              onClick={btnAction}>
              {btn}
            </span>
          )
        ) : (
          tag && (
            <span aria-label="toggle password visibility" className={styles.labelTag}>
              {tag}
            </span>
          )
        )}
      </span>
      {error && error.message.length > 1 ? (
        <span className={styles.labelTextError}>{error.message}</span>
      ) : (
        <span
          className={`${
            val && val.length > 0
              ? styles.labelTextTipActive
              : isAutoFill
              ? styles.labelTextTipActive
              : styles.labelTextTip
          }`}
          aria-hidden="true">
          {placeholder}
        </span>
      )}
    </label>
  );
};

export default AuthInput;
