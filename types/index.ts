export type FeaturedReviewType = {
  id: number
  title: string
  rating: number
  content: string
  author: string
  avatarSrc: string
}

export type ReviewType = {
  href: string
  average: number
  featured: FeaturedReviewType[]
}

export type ImageType = {
  src: string
  alt: string
  productId: number
}

export type ColorType = {
  id: number
  name: string
  class: string
  productId: number
  selectedClass: string
}

export type SizeType = {
  name: string
  inStock: boolean
  productId: number
}

export type Product = {
  id: number
  name: string
  price: number //updated from string
  href: string
  color?: string
  imageSrc: string
  imageAlt: string
  categoryId?: number
  availableQty?: number
  images?: ImageType[]
  colors?: ColorType[]
  sizes?: SizeType[]
  description?: string
  highlights?: HighLightsType[]
  details?: string
}

export type CartItem = Product & {
  quantity: number
}
export type FeaturedType = {
  id: number
  categoryId: number
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  color: string
  price: number
  availableQty: number
}

export type Category = {
  id: number
  href: string
  name: string
  imageSrc: string
  imageAlt: string
  featured: FeaturedType[]
}

export type CategoryState = {
  categories: Category[]
  setCategories: Category[]
}

export type Navigation = {
  categories: Category[]
}

export type Page = {
  name: string
  href: string
}

export type PerkType = {
  name: string
  imageUrl: string
  description: string
}

export type HighLightsType = {
  id: number
  productId: number
  name: string
}

export type OrderDetails = CartItem & {
  orderId: string
}

export type OrderType = {
  id: string
  firstName: string
  lastName: string
  company: string
  address: string
  city: string
  apartment: string
  country: string
  state: string
  postalCode: string
  phone: string
  deliveryMethod: string
  email: string
  paymentMethod: string
  orderDetails: OrderDetails[]
}
