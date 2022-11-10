import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { CartItem, Product } from 'types'
import { current } from '@reduxjs/toolkit'

const initialState: CartItem[] = [
  // {
  //   id: 1,
  //   name: 'Throwback Hip Bag',
  //   href: '#',
  //   color: 'Salmon',
  //   price: 90,
  //   quantity: 1,
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
  //   quantity: 1,
  //   availableQty: 4,
  //   imageSrc:
  //     'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  //   imageAlt:
  //     'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  // },
]
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      let itemInCart = state.find(
        (product: Product) => product.id === action.payload.id
      )
      if (itemInCart) {
        return state.map((item: CartItem) => {
          console.log(item)
          if (item.id === action.payload.id) {
            console.log(item.quantity)
            return { ...item, quantity: action.payload.quantity }
          } else {
            return item
          }
        })
      } else {
        return [...state, action.payload]
      }
    },
    delFromCart: (state, action: PayloadAction<CartItem>) => {
      // console.log(action.payload)
      return state.filter((item) => item.id !== action.payload.id)
    },
    delAllCart: (state) => {
      return []
    },
  },
})

export const { addToCart, delFromCart, delAllCart } = cartSlice.actions
export default cartSlice.reducer
