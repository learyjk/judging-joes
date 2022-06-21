import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { addNewReview, fetchReviews } from './reviewsSlice';

const AddReview = ({ productSlug }) => {
  const dispatch = useDispatch()

  //const [user, setUser] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const user = useSelector(selectUser)

  //const onUserChanged = (e) => setUser(e.target.value)
  const onRatingChanged = (e) => setRating(parseInt(e.target.value))
  const onReviewChanged = (e) => setReview(e.target.value)

  const onAddReviewClicked = async (e) => {
    if (!user || !review || !rating) {
      alert('invalid review')
      return
    }

    const data = { user: user.displayName, rating, review, productSlug }
    await dispatch(addNewReview(data))
    setRating(0)
    setReview('')
    await dispatch(fetchReviews(productSlug))
  }

  return (
    <section className='w-full'>
      <form className='flex flex-col gap-4 bg-slate-100 p-4 rounded-xl'>
        {/* <label htmlFor="name">Username:</label>
        <input
          required
          className='border rounded-md px-2 py-1'
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={onUserChanged}
        /> */}
        <div className='flex flex-row gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="rating">Rating:</label>
            <input
              required
              disabled={!user ? true : false}
              className='flex-grow text-center w-20 border rounded-md px-2 py-1 text-5xl font-display leading-tight'
              type='number'
              id="rating"
              name="rating"
              min="1" max="5"
              value={rating}
              onChange={onRatingChanged}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor="review">Review: </label>
            <textarea
              required
              disabled={!user ? true : false}
              className='flex-grow border rounded-md px-2 py-1'
              type="textarea"
              id="review"
              name="review"
              value={review}
              onChange={onReviewChanged}
            />
          </div>
        </div>

        <button className={`${!user ? 'pointer-events-none' : ''} rounded-md px-2 py-1 bg-blue-200 hover:bg-blue-300`} type="button" onClick={onAddReviewClicked}>
          {`${!user ? 'Please login to review' : 'Add Your Review'}`}
        </button>
      </form>

    </section>
  );
};

export default AddReview;