import DateFormatter from './DateFormatter';

export default function Avatar({ name, picture, date }) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '1rem', marginTop: '1rem'}}>
      <span style={{display: 'flex', alignItems: 'center'}}>
        <img
          src={picture}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full mr-4"
          alt={name}
        />
      </span>
      <span>
        <div className="text-xl font-bold">{name}</div>
        <DateFormatter dateNumber={date} />
      </span>
    </div>
  );
}
