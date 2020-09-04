export function selectFilms(state) {
  return state.filmsList.films;
}

export function selectActiveFilmId(state) {
  return state.filmsList.active;
}
