import { Root } from './shape';

const BASE_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const DEFAULT_LANG = 'en';
const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

export async function searchImages(
  searchTerm: string,
  count: number = 20,
  offset: number = 0,
  cache: { [key: string]: Root } | null = null
) {
  const url = `${BASE_ENDPOINT}?q=${searchTerm}&limit=${count}&offset=${offset}&rating=G&lang=${DEFAULT_LANG}&api_key=${API_KEY}`;

  if (cache && cache[url]) {
    return Promise.resolve(cache[url]);
  }

  try {
    const response = await fetch(url);
    const data: Root = await response.json();

    if (cache) {
      cache[url] = data;
    }

    return data;
  } catch (err) {
    throw err;
  }
}
