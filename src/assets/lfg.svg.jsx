const LFGSVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={`${fill}`}
      d="M19.94 10A8.994 8.994 0 0012 2.06V0h-2v2.06A8.994 8.994 0 002.06 10H0v2h2.06A8.994 8.994 0 0010 19.94V22h2v-2.06A8.994 8.994 0 0019.94 12H22v-2h-2.06zM11 18c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
    />
  </svg>
);

export default LFGSVG;
