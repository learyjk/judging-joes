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

    const data = { user: user.displayName, uid: user.uid, rating, review, productSlug, userPhoto: user.photoURL }
    await dispatch(addNewReview(data))
    setRating(0)
    setReview('')
    await dispatch(fetchReviews(productSlug))
  }

  return (
    <div className='w-full bg-stone-200 pt-2 rounded-b-2xl'>
      <form className='flex flex-col gap-4 p-4 rounded-xl'>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-col relative'>
            <label className='absolute left-2 -top-3 bg-white rounded-md py-0.5 px-1 text-xs uppercase border-slate-400 border' htmlFor="rating">Rating:</label>
            <input
              required
              disabled={!user ? true : false}
              className='flex-grow text-center w-20 border border-slate-400 rounded-md px-2 py-1 text-5xl font-display leading-tight transition-colors duration-500'
              type='number'
              id="rating"
              name="rating"
              min="1" max="5"
              value={rating}
              onChange={onRatingChanged}
            />
          </div>
          <div className='flex flex-col relative w-full'>
            <label className='absolute left-2 -top-3 bg-white rounded-md  py-0.5 px-1 text-xs uppercase border-slate-400 border' htmlFor="review">Review: </label>
            <textarea
              required
              disabled={!user ? true : false}
              className='flex-grow border border-slate-400 rounded-md px-2 py-2 transition-colors duration-500'
              type="textarea"
              id="review"
              name="review"
              value={review}
              onChange={onReviewChanged}
            />
          </div>
        </div>
        <button className={`${!user ? 'pointer-events-none' : ''} rounded-md px-2 py-1 text-red-50 bg-red-700 hover:bg-red-600 transition-colors duration-300 ease-out`} type="button" onClick={onAddReviewClicked}>
          {`${!user ? 'Please login to review' : 'Add Your Review'}`}
        </button>
      </form>
    </div>
  );
};

export default AddReview;