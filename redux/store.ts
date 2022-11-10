import { configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
