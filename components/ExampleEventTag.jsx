import { useState } from 'react';
import * as ga from '../gtag/gtag';

const ExampleEventTag = () => {
  const [query, setQuery] = useState('');

  const search = () => {
    ga.event({
      action: 'search',
      params: {
        search_term: query,
      },
    });
  };

  return (
    <div>
      <div>
        <input type='text' onChange={(event) => setQuery(event.target.value)}></input>
      </div>
      <div>
        <button onClick={() => search()}>Search</button>
      </div>
    </div>
  );
};

export default ExampleEventTag;
