export function selectFilms({ films }) {
  return films.data;
}

export function selectActiveFilm({ films }) {
  return films.data.find(film => film.id === films.activeId)
}

export function selectStatus({ films }) {
  return films.status;
}
