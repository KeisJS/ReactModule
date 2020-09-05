export function selectFilms({ filmsList }) {
  return filmsList.films;
}

export function selectActiveFilm({ filmsList }) {
  return filmsList.films.find(film => film.id === filmsList.activeId)
}

export function selectStatus({ filmsList }) {
  return filmsList.status;
}
