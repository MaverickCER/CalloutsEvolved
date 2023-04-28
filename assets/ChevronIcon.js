/*
Shows custom chevron logo created in figma. No attribution or credit required.
*/
const ChevronIcon = ({ width, height, style, fill, title }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}>
      <title>{title ? title : 'chevron'}</title>
      <g>
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M204.8 460.8L460.801 204.799L512.001 255.999L256 512L204.8 460.8Z"
          fill={fill ? fill : 'current'}
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M256 512L0 256L51.2002 204.8L307.2 460.8L256 512Z"
          fill={fill ? fill : 'current'}
        />
      </g>
      {title ? title : 'chevron'}
    </svg>
  );
};

export default ChevronIcon;
