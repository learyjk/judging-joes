import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { addNewReview, fetchReviews } from "./reviewsSlice";

const AddReview = ({ productSlug }) => {
  const dispatch = useDispatch();

  //const [user, setUser] = useState('')
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const user = useSelector(selectUser);

  //const onUserChanged = (e) => setUser(e.target.value)
  const onRatingChanged = (e) => setRating(parseInt(e.target.value));
  const onReviewChanged = (e) => setReview(e.target.value);

  const onAddReviewClicked = async (e) => {
    if (!user || !review || !rating) {
      alert("invalid review");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("please enter a rating between 1 and 5");
      return;
    }
    if (review.trim().length < 32) {
      alert("please enter at least 32 characters in your review");
      return;
    }

    const data = {
      user: user.displayName,
      uid: user.uid,
      rating,
      review: review.trim(),
      productSlug,
      userPhoto: user.photoURL,
    };
    await dispatch(addNewReview(data));
    setRating(0);
    setReview("");
    await dispatch(fetchReviews(productSlug));
  };

  return (
    <div className="w-full rounded-b-2xl pt-2">
      <form className="flex flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-row gap-4">
          <div className="relative flex flex-col">
            <label
              className="absolute left-2 -top-3 z-10 rounded-md border border-slate-400 bg-white py-0.5 px-1 text-xs uppercase"
              htmlFor="rating"
            >
              Rating:
            </label>
            <input
              required
              disabled={!user ? true : false}
              className="w-20 flex-grow rounded-md border border-slate-400 px-2 py-1 text-center font-display text-5xl leading-tight transition-colors duration-500"
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={onRatingChanged}
            />
          </div>
          <div className="relative flex w-full flex-col">
            <label
              className="absolute left-2 -top-3 z-10 rounded-md  border border-slate-400 bg-white py-0.5 px-1 text-xs uppercase"
              htmlFor="review"
            >
              Review:{" "}
            </label>
            <textarea
              required
              disabled={!user ? true : false}
              className="flex-grow rounded-md border border-slate-400 px-2 py-2 transition-colors duration-500"
              type="textarea"
              id="review"
              name="review"
              value={review}
              onChange={onReviewChanged}
            />
          </div>
        </div>
        <button
          className={`${
            !user ? "pointer-events-none" : ""
          } rounded-md bg-red-700 px-2 py-1 text-red-50 transition-colors duration-300 ease-out hover:bg-red-600`}
          type="button"
          onClick={onAddReviewClicked}
        >
          {`${!user ? "Please login to review" : "Add Your Review"}`}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
