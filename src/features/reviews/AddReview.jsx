import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewReview, fetchReviews } from './reviewsSlice';

const AddReview = ({ productSlug }) => {
  const dispatch = useDispatch()

  const [user, setUser] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const onUserChanged = (e) => setUser(e.target.value)
  const onRatingChanged = (e) => setRating(parseInt(e.target.value))
  const onReviewChanged = (e) => setReview(e.target.value)

  const onAddReviewClicked = async (e) => {
    if (!user || !review || !rating) {
      alert('invalid review')
      return
    }

    const data = { user, rating, review, productSlug }
    await dispatch(addNewReview(data))
    setUser('')
    setRating(0)
    setReview('')
    await dispatch(fetchReviews(productSlug))
  }

  return (
    <section className='w-full'>
      <h2 className='mb-2 text-xl'>Add a Review</h2>
      <form className='flex flex-col'>
        <label htmlFor="name">Username:</label>
        <input
          required
          className='border rounded-md px-2 py-1'
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={onUserChanged}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          required
          className='border rounded-md px-2 py-1'
          type='number'
          id="rating"
          name="rating"
          min="1" max="5"
          value={rating}
          onChange={onRatingChanged}
        />
        <label htmlFor="review">Review: </label>
        <textarea
          required
          className='border rounded-md px-2 py-1'
          type="textarea"
          id="review"
          name="review"
          value={review}
          onChange={onReviewChanged}
        />
        <button className='rounded-md px-2 py-1 bg-blue-200 mt-2 hover:bg-blue-300' type="button" onClick={onAddReviewClicked}>Add Review</button>
      </form>

    </section>
  );
};

export default AddReview;