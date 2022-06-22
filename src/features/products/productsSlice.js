import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
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

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (productSlug) => {
    const docRef = doc(db, 'products', productSlug)
    const productSnapshot = await getDoc(docRef)
    if (productSnapshot.exists()) {
      return productSnapshot.data()
    } else {
      console.error('no document for that slug')
    }
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
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
  }
})

export const productsSliceActions = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = state => state.products.products
export const selectProductBySlug = (state, productSlug) => {
  return state.products.products.find(product => product.slug === productSlug)
}
export const selectProductsByFilterText = (state, filterText) => {
  return state.products.products.filter(product => product.name.toLocaleLowerCase().includes(filterText))
}

export const selectProductsByFilterAndSort = (state, filterText, sortString) => {
  const filteredSortedProducts = state.products.products.filter(product => product.name.toLocaleLowerCase().includes(filterText))
  if (sortString === 'ratingLowToHigh') {
    filteredSortedProducts.sort(compareProductRatings)
  } else {
    filteredSortedProducts.sort(compareProductRatings).reverse()
  }
  return filteredSortedProducts
}

const compareProductRatings = (a, b) => {
  if (a.avgRating < b.avgRating) {
    return -1
  }
  if (a.avgRating > b.avgRating) {
    return 1
  }
  return 0
}