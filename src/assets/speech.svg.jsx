const SpeechSVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    viewBox="0 0 17 19"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={`${fill}`}
      d="M14.733.17H4.47c-.825 0-1.495.67-1.495 1.495v4.79A2.995 2.995 0 000 9.444v2.806c0 1.342.897 2.495 2.154 2.86v3.059l3.656-2.926h4.707a2.996 2.996 0 002.992-2.993v-2.56h1.224c.824 0 1.495-.671 1.495-1.496v-6.53c0-.824-.671-1.495-1.495-1.495zm.37 8.025c0 .201-.17.371-.37.371H9.065L6.9 10.302V8.566H4.47c-.2 0-.37-.17-.37-.37V1.664c0-.2.17-.37.37-.37h10.263c.2 0 .37.17.37.37v6.53z"
    />
  </svg>
);

export default SpeechSVG;
