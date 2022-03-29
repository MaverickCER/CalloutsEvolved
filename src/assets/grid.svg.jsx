const GridSVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    viewBox="0 0 18 19"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={`${fill}`}
      d="M0 .17V2.74h2.571V.17H0zm5.143 0V2.74h2.571V.17H5.143zm5.143 0V2.74h2.571V.17h-2.571zm5.143 0V2.74H18V.17h-2.571zM0 5.313v2.571h2.571V5.313H0zm5.143 0v2.571h2.571V5.313H5.143zm5.143 0v2.571h2.571V5.313h-2.571zm5.143 0v2.571H18V5.313h-2.571zM0 10.456v2.571h2.571v-2.571H0zm5.143 0v2.571h2.571v-2.571H5.143zm5.143 0v2.571h2.571v-2.571h-2.571zm5.143 0v2.571H18v-2.571h-2.571zM0 15.599v2.57h2.571V15.6H0zm5.143 0v2.57h2.571V15.6H5.143zm5.143 0v2.57h2.571V15.6h-2.571zm5.143 0v2.57H18V15.6h-2.571z"
    />
  </svg>
);

export default GridSVG;
