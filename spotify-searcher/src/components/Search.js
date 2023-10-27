import React, { useState } from 'react';
import { searchSpotify } from '../spotify';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleSearch = async () => {
    const data = await searchSpotify(query, offset);
    setResults(data.tracks.items);  // Assuming you're searching for tracks
  };

  const loadMore = async () => {
    setOffset(prevOffset => prevOffset + 50);  // increase offset for next set of results
    const data = await searchSpotify(query, offset + 50);
    setResults(prevResults => [...prevResults, ...data.tracks.items]);  // append new results
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for artists or tracks"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result">
            {result.name}
          </div>
        ))}
      </div>
      {results.length > 0 && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default Search;
