import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { CgClose } from 'react-icons/cg'
import { motion } from 'framer-motion';
import { deleteReview, fetchReviews } from './reviewsSlice';

const ReviewCard = ({ review, productSlug }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const d = new Date(review.created_at * 1000)
  const timeSince = `${formatDistanceToNow(d)} ago`

  const handleDeleteClick = async () => {
    let data = {}
    data.productSlug = productSlug
    data.reviewSlug = review.slug
    try {
      await dispatch(deleteReview(data))
      await dispatch(fetchReviews(productSlug))
    } catch (error) {
      console.error('error deleting review')
    }
  }

  return (
    <div className='relative flex w-full items-stretch border border-stone-400 rounded-lg bg-white transition-all duration-300'>
      {/* TODO Remove leary.keegan access */}
      {user && ((user.uid === review.uid) || user.email.includes('leary.keegan')) ? (
        <motion.button className='absolute -top-2 -right-2' onClick={handleDeleteClick} whileTap={{ scale: 0.8 }}><CgClose className='text-red-50 bg-red-700 rounded-full p-0.5 border-red-900 hover:bg-red-600 hover:scale-110 transition-all duration-300 ease-out' /></motion.button>
      ) : (
        <></>
      )}
      <div className=' relative flex-none flex flex-col items-center w-16'>
        <p className=' text-5xl text-red-50 font-display font-bold z-10 ml-4 mt-1'>{review.rating}</p>
        <div className='absolute top-0 bottom-0 right-0 left-0 m-4 h-12 w-12 bg-red-700 rounded-full'></div>
      </div>
      <div className='flex flex-col w-full p-4'>
        <div className='flex flex-row items-center justify-between mb-2'>
          <div className='flex flex-row gap-2'>
            {review.userPhoto
              ?
              (<img className='w-4 h-4 object-cover rounded-full' src={review.userPhoto} alt={review.user} />)
              :
              (<FaUserCircle className='w-4 h-4' />)
            }
            <p className='text-xs font-semibold tracking-widest mb-1'>{review.user}</p>
          </div>

          <p className='text-xs uppercase font-light italic tracking-widest mb-1'>{timeSince}</p>
        </div>
        <p className=''>{review.review}</p>
      </div>
    </div>

  );
};

export default ReviewCard;
