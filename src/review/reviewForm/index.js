import React, { createRef } from 'react';

export function ReviewForm({ saveReview }) {
  const userNameRef = createRef();
  const emailRef = createRef();
  const reviewRef = createRef();
  const sendButtonRef = createRef();
  const fields = [userNameRef, emailRef, reviewRef];

  function onSendReview() {
    if (fields.some(field => !field.current.checkValidity())) {
      return;
    }

    sendButtonRef.current.disabled = true;
    saveReview(reviewRef.current.value);
  }

  return (
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
      <button type="button" className="btn btn-primary" onClick={ onSendReview } ref={ sendButtonRef }>Send</button>
    </>
  )
}
