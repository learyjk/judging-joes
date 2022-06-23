import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productSlug) => {
    const reviewsRef = collection(db, `products/${productSlug}/reviews`);
    const q = query(reviewsRef, orderBy("created_at", "desc"));
    const reviewsSnapshot = await getDocs(q);
    const reviewsList = reviewsSnapshot.docs.map((doc) => {
      let obj = doc.data();
      obj.slug = doc.id;
      return obj;
    });
    return reviewsList;
  }
);

export const addNewReview = createAsyncThunk(
  "reviews/addReview",
  async (data) => {
    try {
      data.created_at = Timestamp.now().seconds;
      console.log("data", data);
      const document = doc(
        db,
        `products/${data.productSlug}/reviews`,
        `${data.created_at}-${data.user}`
      );
      await setDoc(document, data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (data) => {
    console.log(data);
    const reviewRef = doc(
      db,
      `products/${data.productSlug}/reviews`,
      data.reviewSlug
    );
    //console.log(reviewRef)
    try {
      await deleteDoc(reviewRef);
    } catch (error) {
      console.error("error deleting review");
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetReviews(state, action) {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        console.log("state");
        console.log("action", action);
      });
  },
});

export const reviewsSliceActions = reviewsSlice.actions;

export default reviewsSlice.reducer;

export const selectAllReviews = (state) => state.reviews.reviews;
