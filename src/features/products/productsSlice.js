import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productsCol = collection(db, 'products')
    const productSnapshot = await getDocs(productsCol)
    const productsList = productSnapshot.docs.map(doc => {
      let obj = doc.data()
      obj.slug = doc.id
      return obj
    })
    return productsList
  }
)

export const addNewProduct = createAsyncThunk(
  'products/addProduct',
  async (data) => {
    let slug = data.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    try {
      const document = doc(db, 'products', slug)
      await setDoc(document, data)
    } catch (error) {
      console.log(error)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    })
  }
})

export const productsSliceActions = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = state => state.products.products