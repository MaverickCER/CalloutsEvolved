export default function DateFormatter({ dateNumber }) {
  const dateRaw = new Date(dateNumber);
  const dateArray = dateRaw.toString().split(' ');
  const date = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  return <time dateTime={dateNumber}>{date}</time>;
}
