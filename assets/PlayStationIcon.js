/*
Shows an PlayStation logo obtained from the link below with Creative Commons 0 License. No attribution or credit required.
https://www.svgrepo.com/svg/73961/playstation-logotype
*/
const PlayStationIcon = ({ width, height, style, fill }) => {
  return (
    <svg
      viewBox="0 0 106.726 106.726"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}>
      <title>PlayStation Logo</title>
      <g>
        <path
          d="M11.703,67.563l-3.6,1.4c-5.4,2.3-8.2,4.7-8.1,6.8c0.3,3.1,3.8,5.4,10.2,7.1    c8.3,2.2,16.7,2.7,25.4,1.4v-8.7l0,0l-6.9,2.6c-7.2,2.5-10.9,0.4-10.9,0.4c-1.1-0.7-1.6-2.4,1.4-3.5l3.8-1.4l12.6-4.5v-10.1    l-3.2,1.1L11.703,67.563z"
          fill={fill ? fill : 'current'}
        />
        <path
          d="M64.303,32.463v25.9c5.4,2.6,10.2,2.8,13.8,0.1c3.7-2.6,5.7-7.1,5.7-13.9c0-7.1-1.4-12.5-4.5-16.1    c-2.8-3.8-7.8-7-15.2-9.5c-9.2-3-17-5.6-23.2-6.9v77.5l16.7,5.1v-64.4C57.503,26.363,64.303,26.663,64.303,32.463z"
          fill={fill ? fill : 'current'}
        />
        <path
          d="M106.703,72.463c-0.1-2.7-3.3-4.8-9-6.7c-6.4-2.1-11.9-3.1-17.9-2.9c-5.5,0.1-12.1,1.9-18,3.8v9.9    l16.2-5.7c0,0,4.9-1.8,9.1-0.7c3.2,0.8,3,2.6-0.2,3.7l-3.7,1.5l-21.4,7.7v10.1l10-3.6l24-8.5l2.8-1.3    C104.403,77.663,107.003,75.363,106.703,72.463z"
          fill={fill ? fill : 'current'}
        />
      </g>
      PlayStation Logo
    </svg>
  );
};

export default PlayStationIcon;
