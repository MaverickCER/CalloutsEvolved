export default function DateFormatter({ dateString }) {
  const dateRaw = new Date(dateString);
  const dateArray = dateRaw.toString().split(' ');
  const date = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  return <time dateTime={dateString}>{date}</time>;
}
