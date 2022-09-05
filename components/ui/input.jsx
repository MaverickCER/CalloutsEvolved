import styles from './input.module.css';
import { useSettings } from '../../context/SettingsContext';
import { useState } from 'react';

const Input = ({
  autoComplete,
  blur,
  btn,
  btnAction,
  change,
  label,
  maxLength,
  name,
  placeholder,
  props,
  required,
  tag,
  title,
  type,
  val,
  valMax,
  valMin,
  valStep,
}) => {
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
          className={`${styles.input} ${theme.mod === 'light' ? '' : styles.inverted}`}
          autoComplete={autoComplete}
          onAnimationEnd={() => {
            setIsAutoFill(true);
          }}
          min={valMin}
          max={valMax}
          step={valStep}
          onBlur={blur}
          onChange={change}
          defaultValue={val}
          maxLength={maxLength ? maxLength : 80}
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
      <span className={`${styles.labelTextTipActive}`} aria-hidden="true">
        {placeholder}
      </span>
    </label>
  );
};

export default Input;
