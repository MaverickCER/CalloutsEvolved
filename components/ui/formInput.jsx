import React, { forwardRef } from 'react';

import styles from './forminput.module.css';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';

const FormInput = forwardRef((props, ref) => {
  const {
    autoComplete,
    blur,
    btn,
    btnAction,
    error,
    label,
    name,
    placeholder,
    register,
    required,
    maxLength,
    tag,
    title,
    type,
    val,
  } = props;
  const { theme } = useSettings();
  const [isClick, setIsClick] = useState(true);
  const [isAutoFill, setIsAutoFill] = useState(false);
  return (
    <label
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
          ref={ref}
          maxLength={maxLength ? maxLength : 240}
          className={`${styles.input} ${theme.mod === 'light' ? '' : styles.inverted}`}
          autoComplete={autoComplete}
          onAnimationEnd={() => {
            setIsAutoFill(true);
          }}
          onBlur={(e) => {
            if (blur) {
              blur(e);
            }
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
        <span className={styles.labelTextError} style={{ color: `rgb(${theme.cba})` }}>
          {error.message}
        </span>
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
});

export default FormInput;
