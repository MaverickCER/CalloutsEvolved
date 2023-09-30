/*
Shows an cross platform logo obtained from the link below with Creative Commons 0 License. No attribution or credit required.
https://www.svgrepo.com/svg/226832/network-group
*/
const CrossPlatformIcon = ({ width, height, style, fill }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}>
      <title>Cross Platform Logo</title>
      <g>
        <path
          d="M476.035,313.415c16.927-102.591-38.981-201.744-132.63-241.677C329.8,36.869,295.92,12.006,256,12.006    c-39.85,0-73.791,24.816-87.411,59.734C75.266,111.537,19.16,210.344,35.901,313.004C13.872,330.402,0,357.363,0,386.754    c0,72.402,78.903,117.237,140.807,81.177c70.53,42.637,159.285,42.79,230.004,0.224C432.605,504.547,512,459.922,512,387.215    C512,357.796,498.101,330.812,476.035,313.415z M445.389,297.414c-88.284-26.686-157.197,77.324-100.678,148.132    c-55.441,29.253-122.253,29.221-177.685-0.133c57.147-70.905-12.119-175.204-100.466-148.445    c-7.938-75.558,29.599-148.481,95.795-185.924c2.73,49.287,43.688,88.549,93.644,88.549c49.958,0,90.914-39.262,93.644-88.549    C415.902,148.523,453.533,221.61,445.389,297.414z"
          fill={fill ? fill : 'current'}
        />
      </g>
      Cross Platform Logo
    </svg>
  );
};

export default CrossPlatformIcon;
