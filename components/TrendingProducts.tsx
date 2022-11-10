import Link from 'next/link'
import { useAppSelector } from 'redux/hooks'
import { Product } from 'types'
import TrendingProduct from './TrendingProduct'

const TrendingProducts = ({ products }: { products: Product[] }) => {
  // const trendingProducts = useAppSelector((state) => state.products)

  // const trendingProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Leather Long Wallet',
  //     color: 'Natural',
  //     price: 75.0,
  //     href: '/product/1',
  //     imageSrc:
  //       'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
  //     imageAlt: 'Hand stitched, orange leather long wallet.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Leather Long Wallet',
  //     color: 'Natural',
  //     price: 75.0,
  //     href: '/product/1',
  //     imageSrc:
  //       'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
  //     imageAlt: 'Hand stitched, orange leather long wallet.',
  //   },
  // ]

  return (
    <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
      <div className="md:flex md:items-center md:justify-between">
        <h2
          id="favorites-heading"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Trending Products
        </h2>
        <Link href="/product">
          <a
            // href=""
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
          >
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <TrendingProduct key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-sm md:hidden">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Shop the collection<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default TrendingProducts
