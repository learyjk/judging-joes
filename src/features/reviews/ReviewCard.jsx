import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import { deleteReview, fetchReviews } from "./reviewsSlice";

const ReviewCard = ({ review, productSlug }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const d = new Date(review.created_at * 1000);
  const timeSince = `${formatDistanceToNow(d)} ago`;

  const handleDeleteClick = async () => {
    let data = {};
    data.productSlug = productSlug;
    data.reviewSlug = review.slug;
    try {
      await dispatch(deleteReview(data));
      await dispatch(fetchReviews(productSlug));
    } catch (error) {
      console.error("error deleting review");
    }
  };

  return (
    <div className="relative flex w-full items-stretch rounded-lg border border-stone-400 bg-white transition-all duration-300">
      {/* TODO Remove leary.keegan access */}
      {user &&
      (user.uid === review.uid || user.email.includes("leary.keegan")) ? (
        <motion.button
          className="absolute -top-2 -right-2"
          onClick={handleDeleteClick}
          whileTap={{ scale: 0.8 }}
        >
          <CgClose className="rounded-full border-red-900 bg-red-700 p-0.5 text-red-50 transition-all duration-300 ease-out hover:scale-110 hover:bg-red-600" />
        </motion.button>
      ) : (
        <></>
      )}
      <div className=" relative flex w-16 flex-none flex-col items-center">
        <p className=" z-10 ml-4 mt-1 font-display text-5xl font-bold text-red-50">
          {review.rating}
        </p>
        <div className="absolute top-0 bottom-0 right-0 left-0 m-4 h-12 w-12 rounded-full bg-red-700"></div>
      </div>
      <div className="flex w-full flex-col p-4">
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            {review.userPhoto ? (
              <img
                className="h-4 w-4 rounded-full object-cover"
                src={review.userPhoto}
                alt={review.user}
              />
            ) : (
              <FaUserCircle className="h-4 w-4" />
            )}
            <p className="mb-1 text-xs font-semibold tracking-widest">
              {review.user}
            </p>
          </div>

          <p className="mb-1 text-xs font-light uppercase italic tracking-widest">
            {timeSince}
          </p>
        </div>
        <p className="">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
