import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { selectFilm, selectFilmStatus, selectReviewStatus, selectReview } from 'Src/review/selectors';
import { reviewActions } from 'Src/review/actions';
import { status } from 'Src/status';
import { store } from 'Src/app/store';
import { Preloader } from 'Src/preloader';
import { ReviewForm } from 'Src/review/reviewForm';

function Review({ match, getFilm, cancelGetFilm, film, currentFilmStatus, saveReview, currentReviewStatus, review }) {
  const filmId = match.params.filmId;

  useEffect(() => {
    getFilm(filmId);

    return () => {
      cancelGetFilm();
      store.detachReducers(['review']);
      store.cancelSagas(['review']);
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        { status.isPending(currentReviewStatus) && <Preloader text="Review update"></Preloader>}
        { status.isPending(currentFilmStatus) && <Preloader text="Data loading"></Preloader> }
        { status.isSuccess(currentFilmStatus) && (
          <div className="col-12">
            <h1>Review: { film.title }</h1>
            { status.isSuccess(currentReviewStatus) ? (
              <div className={ styles.reviewData }>
                { review }
              </div>
            ) : (
              <ReviewForm saveReview={ saveReview }></ReviewForm>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    film: selectFilm(state),
    currentFilmStatus: selectFilmStatus(state),
    currentReviewStatus: selectReviewStatus(state),
    review: selectReview(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getFilm: filmId => dispatch(reviewActions.film.get(filmId)),
    cancelGetFilm: () => dispatch(reviewActions.film.cancel()),
    saveReview: review => dispatch(reviewActions.review.save(review))
  }
}

Review = connect(mapStateToProps, mapDispatchToProps)(Review);

export { Review }
