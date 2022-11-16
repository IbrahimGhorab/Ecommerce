import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Product } from 'types'

// Define the initial state using that type
const initialState: Product[] = [
  // {
  //   id: 1,
  //   name: 'Throwback Hip Bag',
  //   href: '#',
  //   color: 'Salmon',
  //   price: 90.0,
  //   availableQty: 4,
  //   imageSrc:
  //     'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  //   imageAlt:
  //     'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  // },
  // {
  //   id: 2,
  //   name: 'Medium Stuff Satchel',
  //   href: '#',
  //   color: 'Blue',
  //   price: 32.0,
  //   availableQty: 4,
  //   imageSrc:
  //     'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  //   imageAlt:
  //     'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  // },
]

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProduct: (state, action: PayloadAction<Product[]>) => {
      // console.log(state)
      return action.payload
    },
    addNewProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    },

    delProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload)
    },
  },
})

export const { getAllProduct, addNewProduct, delProduct } = productSlice.actions

export default productSlice.reducer
