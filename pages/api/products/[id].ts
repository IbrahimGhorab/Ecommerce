import { extractSheets } from 'spreadsheet-to-json'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ColorType,
  HighLightsType,
  ImageType,
  Product,
  SizeType,
} from './../../../types/index'
// const { extractSheets } = require("spreadsheet-to-json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  // optional custom format cell function
  // const formatCell = (Product: any) => Product.toLowerCase()

  extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: '1YF3npwm2TLf9M2JcWwA84DlKoo_tsdAipwTAjh5sQUw',
      // your google oauth2 credentials or API_KEY
      credentials: require('../../../credentials.json'),
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Product', 'Images', 'Highlights', 'Sizes', 'Colors'],
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
      }
    ) {
      let product = data.Product.find(
        (product) => +product.id === +req.query.id!
      )
      const images = data.Images.filter(
        (image) => image.productId === product?.id
      )
      const highLights = data.Highlights.filter(
        (highLight) => highLight.productId === product?.id
      )
      const sizes = data.Sizes.filter((size) => size.productId === product?.id)
      const colors = data.Colors.filter(
        (color) => color.productId === product?.id
      )

      res.json({
        ...product,
        images,
        highLights,
        sizes,
        colors,
      })
    }
  )
}
