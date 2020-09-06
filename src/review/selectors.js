export function selectFilm({ review }) {
  return review.film.data;
}

export function selectFilmStatus({ review }) {
  return review.film.status;
}

export function selectReviewStatus({ review }) {
  return review.review.status;
}

export function selectReview({ review }) {
  return review.review.data;
}
