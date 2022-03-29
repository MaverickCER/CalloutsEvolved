const FadeSVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    viewBox="0 0 1040 180"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="url(#gradient)"
      fillRule="evenodd"
      d="M523.37 0c209.81-.247 420.111 103.165 508.62 152.594 13.05 7.286 7.77 25.755-7.18 25.773L15.24 179.56c-14.984.018-20.28-18.507-7.177-25.777C97.549 104.136 310.214.253 523.37.001z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="5%" stopColor="var(--modeSecondary" />
        <stop offset="95%" stopColor="var(--modePrimary)" />
      </linearGradient>
    </defs>
  </svg>
);

export default FadeSVG;
