const KeySVG = ({ style, className, fill = "current" }) => (
  <svg
    style={style}
    viewBox="0 0 24 19"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={`${fill}`}
      d="M22.253 7.218H3.967V6.48c0-.36.293-.652.652-.652h14.159c.934 0 1.695-.76 1.695-1.695 0-.934-.76-1.695-1.695-1.695H4.384a.653.653 0 01-.651-.651V.69a.522.522 0 00-1.043 0v1.096c0 .934.76 1.694 1.694 1.694h14.394a.653.653 0 010 1.304H4.619c-.934 0-1.695.76-1.695 1.695v.738H1.528A1.53 1.53 0 000 8.746v7.896a1.53 1.53 0 001.528 1.528h20.725a1.53 1.53 0 001.528-1.529V8.748a1.53 1.53 0 00-1.528-1.529zm.485 9.424a.486.486 0 01-.485.485H1.528a.486.486 0 01-.485-.485V8.745c0-.267.218-.485.485-.485h20.725c.267 0 .485.218.485.486v7.895z"
    />
    <path
      fill={`${fill}`}
      d="M16.297 8.835H2.138a.522.522 0 00-.521.521v6.676c0 .288.233.521.521.521h14.16a.522.522 0 00.52-.521V9.356a.522.522 0 00-.52-.521zm-.521 2.225h-1.092V9.878h1.092v1.182zm-3.517 0V9.878h1.382v1.182h-1.382zm-1.095 2.225v-1.182h1.382v1.182h-1.382zm-4.85 0v-1.182h1.382v1.182H6.314zm-1.043-1.182v1.182H4.045v-1.182h1.226zm3.468 0h1.382v1.182H8.739v-1.182zm2.477-1.043H9.834V9.878h1.382v1.182zm-2.425 0H7.409V9.878h1.382v1.182zm-2.425 0H4.984V9.878h1.382v1.182zm-3.364 2.225H2.66v-1.182h.342v1.182zm3.364 1.043v1.182H4.984v-1.182h1.382zm1.043 0h3.807v1.182H7.409v-1.182zm4.85 0h1.382v1.182h-1.382v-1.182zm1.33-1.043v-1.182h2.187v1.182h-2.187zM3.94 9.878v1.182H2.66V9.878H3.94zm-1.281 4.45H3.94v1.182H2.66v-1.182zm12.024 1.182v-1.182h1.092v1.182h-1.092zM21.643 8.835h-3.491a.522.522 0 00-.522.521v6.676c0 .288.234.521.522.521h3.491a.522.522 0 00.522-.521V9.356a.522.522 0 00-.522-.521zm-.521 2.225h-.728V9.878h.728v1.182zm-.728 1.043h.728v1.182h-.728v-1.182zm-1.043 1.182h-.678v-1.182h.678v1.182zm0-3.407v1.182h-.678V9.878h.678zm-.678 4.45h.678v1.182h-.678v-1.182zm1.721 1.182v-1.182h.728v1.182h-.728z"
    />
  </svg>
);

export default KeySVG;