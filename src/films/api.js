import axios from 'axios';

export function getFilms() {
  return axios.get('/api/films');
}

export function connectServerFilmsData({ results = [] }) {
  return results.map(({ title, episode_id: id, opening_crawl: intro }) => ({
    title,
    id,
    intro
  }))
}
