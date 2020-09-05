import React, { createRef, useEffect } from 'react';
import { reviewActions } from 'Src/review/actions';
import { connect } from 'react-redux';
import { selectFilm } from 'Src/review/selectors';

function Review({ match, getFilm, cancelGetFilm, film }) {
  const userName = createRef();
  const email = createRef();
  const review = createRef();
  const sendButton = createRef();
  const fields = [userName, email, review];
  const filmId = match.params.filmId;

  function sendReview() {
    if (fields.some(field => !field.current.checkValidity())) {
      return;
    }

    sendButton.current.disabled = true;
    console.log('send')
  }

  useEffect(() => {
    getFilm(filmId);

    return () => cancelGetFilm();
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Review: { film.title }</h1>
          <form className="was-validated">
            <div className="form-group">
              <label htmlFor="userName">User name:</label>
              <input type="text" className="form-control" id="userName" placeholder="Enter name..." required
                     ref={ userName }/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" placeholder="Enter email..."
                     required pattern=".+@.+\..+" ref={ email }
              />
            </div>

            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea className="form-control" id="review" rows="6" required ref={ review }></textarea>
            </div>
          </form>
          <button type="button" className="btn btn-primary" onClick={ sendReview } ref={ sendButton }>Send</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    film: selectFilm(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getFilm: filmId => dispatch(reviewActions.film.get(filmId)),
    cancelGetFilm: () => dispatch(reviewActions.film.cancel())
  }
}

Review = connect(mapStateToProps, mapDispatchToProps)(Review);

export { Review }
