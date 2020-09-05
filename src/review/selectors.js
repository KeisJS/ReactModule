export function selectFilm({ review }) {
  return review.film.data;
}

export function selectFilmStatus({ review }) {
  return review.film.status;
}
