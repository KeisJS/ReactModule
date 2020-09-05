import React, { createRef } from 'react';

function Review({ match }) {
  const userName = createRef();
  const email = createRef();
  const review = createRef();
  const sendButton = createRef();
  const fields = [userName, email, review];

  function sendReview() {
    if (fields.some(field => !field.current.checkValidity())) {
      return;
    }

    sendButton.current.disabled = true;
    console.log('send')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Film id: { match.params.filmId }</h1>
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

export { Review }
