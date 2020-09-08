import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectFilm, selectFilmStatus, selectReviewStatus, selectReview } from 'Src/review/selectors';
import { reviewActions } from 'Src/review/actions';
import { status } from 'Src/status';
import { store } from 'Src/app/store';
import { Preloader } from 'Src/preloader';
import { ReviewForm } from 'Src/review/reviewForm';

function Review() {
  const { filmId } = useParams();

  const { film, currentFilmStatus, currentReviewStatus, review } = useSelector(state => {
    return {
      film: selectFilm(state),
      currentFilmStatus: selectFilmStatus(state),
      currentReviewStatus: selectReviewStatus(state),
      review: selectReview(state)
    }
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.film.get(filmId));

    return () => {
      dispatch(reviewActions.film.cancel());
      store.detachReducers(['review']);
      store.cancelSagas(['review']);
    }
  }, []);

  const saveReview = review => dispatch(reviewActions.review.save(review));

  return (
    <div className="container">
      <div className="row">
        { status.isPending(currentReviewStatus) && <Preloader text="Review update"></Preloader>}
        { status.isPending(currentFilmStatus) && <Preloader text="Data loading"></Preloader> }
        { status.isSuccess(currentFilmStatus) && (
          <div className="col-12">
            <h1>Review: { film.title }</h1>
            { status.isSuccess(currentReviewStatus) ? (
              <>
                <h2>Thank you!</h2>
                <div className={ styles.reviewData }>
                  { review }
                </div>
              </>
            ) : (
              <ReviewForm saveReview={ saveReview }></ReviewForm>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { Review }
