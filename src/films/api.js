import axios from 'axios';

export function mapSeverDataFilm({ title, episode_id: id, opening_crawl: intro, url }) {
  const urlId = url.match(/(\d)\/?$/)[1];

  return {
    title,
    id,
    intro,
    urlId
  }
}

export function getFilms() {
  return axios.get('/api/films');
}

export function connectServerFilmsData({ results = [] }) {
  return results.map(mapSeverDataFilm)
}

export function getFilm(filmId) {
  return axios.get(`/api/films/${ filmId }`);
}
