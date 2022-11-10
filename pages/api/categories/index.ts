import { extractSheets } from 'spreadsheet-to-json'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Category, FeaturedType } from 'types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  // optional custom format cell function
  // const formatCell = (Category: Category) => Category.toLowerCase()

  extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: '1YF3npwm2TLf9M2JcWwA84DlKoo_tsdAipwTAjh5sQUw',
      // your google oauth2 credentials or API_KEY
      credentials: require('../../../credentials.json'),
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Category', 'SubCategory'],
      // optional: custom function to parse the cells
      // formatCell: formatCell,
    },
    function (
      err: any,
      data: { Category: Category[]; SubCategory: FeaturedType[] }
    ) {
      const categories = data.Category.map((category) => {
        const featured = data.SubCategory.filter(
          (subCategory) => subCategory.categoryId === category.id
        )
        return {
          ...category,
          featured,
        }
      })
      res.json(categories)
    }
  )
}
