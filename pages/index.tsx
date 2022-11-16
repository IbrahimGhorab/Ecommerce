import type { NextPage } from 'next'
import Collections from '../components/Collections'
import TrendingProducts from '../components/TrendingProducts'
import Layout from 'components/layout'
import Perks from 'components/Perks'
import {
  Product,
  ImageType,
  HighLightsType,
  SizeType,
  Category,
  ColorType,
  FeaturedType,
} from '../types'
import { extractSheets } from 'spreadsheet-to-json'
import { google } from 'googleapis'
// import { useAppSelector } from 'redux/hooks'

const Home = ({
  categories,
  products,
}: {
  categories: Category[]
  products: Product[]
}) => {
  return (
    <div className="">
      <Layout>
        <main>
          {/* Hero section */}
          <div className="relative">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden sm:flex sm:flex-col"
            >
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
            </div>

            <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
              {/* Background image and overlap */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col sm:hidden"
              >
                <div className="relative w-full flex-1 bg-gray-800">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-900 opacity-50" />
                </div>
                <div className="h-48 w-full bg-white" />
              </div>
              <div className="relative py-32">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Mid-Season Sale
                </h1>
                <div className="mt-4 sm:mt-6">
                  <a
                    href="#"
                    className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>

            <section
              aria-labelledby="collection-heading"
              className="relative -mt-96 sm:mt-0"
            >
              <Collections categories={categories} />
            </section>
          </div>

          <section aria-labelledby="trending-heading">
            <TrendingProducts products={products} />
          </section>

          <section
            aria-labelledby="perks-heading"
            className="border-t border-gray-200 bg-gray-50"
          >
            <Perks />
          </section>
        </main>
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  // const res = await fetch('http://localhost:3000/api/categories')
  // const data = await res.json()

  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  // optional custom format cell function
  // const formatCell = (Product: any) => Product.toLowerCase()

  async function getAllProducts() {
    let products
    let categories

    await extractSheets(
      {
        // your google spreadhsheet key
        spreadsheetKey: '1YF3npwm2TLf9M2JcWwA84DlKoo_tsdAipwTAjh5sQUw',
        // your google oauth2 credentials or API_KEY
        credentials: require('../credentials.json'),
        // optional: names of the sheets you want to extract
        sheetsToExtract: [
          'Product',
          'Images',
          'Highlights',
          'Sizes',
          'Colors',
          'Category',
          'SubCategory',
        ],
        // optional: custom function to parse the cells
        // formatCell: formatCell,
      },
      function (
        err: any,
        data: {
          Product: Product[]
          Images: ImageType[]
          Highlights: HighLightsType[]
          Sizes: SizeType[]
          Colors: ColorType[]
          Category: Category[]
          SubCategory: FeaturedType[]
        }
      ) {
        let currentProducts = data.Product.map((product) => {
          const images = data.Images.filter(
            (image) => image.productId === product.id
          )
          const highlights = data.Highlights.filter(
            (highLight) => highLight.productId === product.id
          )
          const sizes = data.Sizes.filter(
            (size) => size.productId === product.id
          )
          const colors = data.Colors.filter(
            (color) => color.productId === product.id
          )
          // console.log(highlights)

          return {
            ...product,
            images,
            highlights,
            sizes,
            colors,
          }
        })
        const currentCategories = data.Category.map((category) => {
          const featured = data.SubCategory.filter(
            (subCategory) => subCategory.categoryId === category.id
          )
          return {
            ...category,
            featured,
          }
        })
        products = currentProducts
        categories = currentCategories
      }
    )
    return {
      products,
      categories,
    }
  }
  // const products = await getAllProducts()

  return {
    props: {
      categories: (await getAllProducts()).categories,
      products: (await getAllProducts()).products,
    },
  }
}
