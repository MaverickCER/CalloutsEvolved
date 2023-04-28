/*
Shows a Nintendo logo obtained from the link below with Creative Commons 0 License. No attribution or credit required.
https://www.svgrepo.com/svg/331503/nintendo
*/
const NintendoIcon = ({ width, height, style, fill }) => {
  return (
    <svg
      viewBox="0 0 432 410"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}>
      <title>Nintendo Logo</title>
      <g>
        <path
          d="M0.900391 0.699951H128.2L304.8 285.7V0.699951H431.2V409.4H304.9L127.5 124.4V409.4H0.900391V0.699951Z"
          fill={fill ? fill : 'current'}
        />
      </g>
      Nintendo Logo
    </svg>
  );
};

export default NintendoIcon;
