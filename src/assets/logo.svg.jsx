const LogoSVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    fill="none"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={`${fill}`}
      d="M30 26a10 10 0 01-20 0h2.402a7.598 7.598 0 1015.196 0H30z"
    />
    <path
      fill={`${fill}`}
      d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20zM2.793 20c0 9.503 7.704 17.207 17.207 17.207S37.207 29.503 37.207 20 29.503 2.793 20 2.793 2.793 10.497 2.793 20z"
    />
    <path
      fill={`${fill}`}
      d="M26 26a6 6 0 11-12 0 6 6 0 0112 0zM12.4 26a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM30 26a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
    />
    <path fill={`${fill}`} d="M26 14a6 6 0 11-12 0 6 6 0 0112 0z" />
    <path
      fill={`${fill}`}
      d="M14 14h12v12H14V14zM18.8 35.6h2.4V38h-2.4v-2.4z"
    />
  </svg>
);

export default LogoSVG;
