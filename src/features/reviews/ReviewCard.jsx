import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaUserCircle } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const d = new Date(review.created_at * 1000)
  const timeSince = `${formatDistanceToNow(d)} ago`
  return (
    <div className='flex w-full items-stretch border border-stone-400 rounded-lg bg-white'>
      <div className=' relative flex-none flex flex-col items-center w-16'>
        <p className=' text-5xl text-red-50 font-display font-bold z-10 ml-4 mt-1'>{review.rating}</p>
        <div className='absolute top-0 bottom-0 right-0 left-0 m-4 h-12 w-12 bg-red-700 rounded-full'></div>
      </div>
      <div className='flex flex-col w-full p-4'>
        <div className='flex flex-row items-center justify-between mb-2'>
          <div className='flex flex-row gap-2'>
            {review.userPhoto
              ?
              (<img className='w-12 h-12 object-cover rounded-full' src={review.userPhoto} alt={review.user} />)
              :
              (<FaUserCircle />)
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
