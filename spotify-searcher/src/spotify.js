// src/spotify.js
import axios from 'axios';

const clientId = '927f26ed51b04b859ddf0ed8c7e590e8';
const clientSecret = 'c8f6f5160aaa4819a4723275c2dc5250';

const getToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials'
    }),
    {
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data.access_token;
};

export const searchSpotify = async (query, offset = 0) => {
  const token = await getToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      q: query,
      type: 'track,artist',
      limit: 50,  // maximum number of items per request
      offset: offset  // offset for pagination
    }
  });
  return response.data;
};
