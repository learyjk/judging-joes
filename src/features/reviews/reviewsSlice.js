import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { collection, getDocs, doc, setDoc, Timestamp, query, orderBy, FieldValue, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";

const initialState = {
  reviews: [],
  status: 'idle',
  error: null,
}

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productSlug) => {
    const reviewsRef = collection(db, `products/${productSlug}/reviews`)
    const q = query(reviewsRef, orderBy('created_at', 'desc'))
    console.log(q)
    const reviewsSnapshot = await getDocs(q)
    const reviewsList = reviewsSnapshot.docs.map(doc => {
      let obj = doc.data()
      obj.slug = doc.id
      return obj
    })
    console.log(reviewsList)
    return reviewsList
  }
)

export const addNewReview = createAsyncThunk(
  'reviews/addReview',
  async (data) => {
    try {
      data.created_at = Timestamp.now().seconds
      console.log('data', data)
      const document = doc(db, `products/${data.productSlug}/reviews`, `${data.created_at}-${data.user}`)
      await setDoc(document, data)
    } catch (error) {
      console.log(error)
    }
  }
)

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetReviews(state, action) {
      state.reviews = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.reviews = action.payload;
    })
  }
})

export const reviewsSliceActions = reviewsSlice.actions

export default reviewsSlice.reducer

export const selectAllReviews = state => state.reviews.reviews