import React, { createRef, useEffect } from 'react';
import { reviewActions } from 'Src/review/actions';
import { connect } from 'react-redux';
import { selectFilm, selectFilmStatus, selectReviewStatus, selectReview } from 'Src/review/selectors';
import { status } from 'Src/status';
import { Preloader } from 'Src/preloader';
import { store } from 'Src/app/store';
import styles from './styles.module.scss'

function Review({ match, getFilm, cancelGetFilm, film, currentFilmStatus, saveReview, currentReviewStatus, review }) {
  const userNameRef = createRef();
  const emailRef = createRef();
  const reviewRef = createRef();
  const sendButtonRef = createRef();
  const fields = [userNameRef, emailRef, reviewRef];
  const filmId = match.params.filmId;

  function sendReview() {
    if (fields.some(field => !field.current.checkValidity())) {
      return;
    }

    sendButtonRef.current.disabled = true;
    saveReview(reviewRef.current.value);
  }

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
              <>
                <form className="was-validated">
                  <div className="form-group">
                    <label htmlFor="userName">User name:</label>
                    <input type="text" className="form-control" id="userName" placeholder="Enter name..." required
                           ref={ userNameRef }/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter email..."
                           required pattern=".+@.+\..+" ref={ emailRef }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <textarea className="form-control" id="review" rows="6" required ref={ reviewRef }></textarea>
                  </div>
                </form>
                <button type="button" className="btn btn-primary" onClick={ sendReview } ref={ sendButtonRef }>Send</button>
              </>
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
