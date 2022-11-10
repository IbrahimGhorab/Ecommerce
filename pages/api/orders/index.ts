import { OrderType, OrderDetails } from './../../../types/index'
import { extractSheets } from 'spreadsheet-to-json'
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

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
      sheetsToExtract: ['Orders', 'OrderDetails'],
      // optional: custom function to parse the cells
      // formatCell: formatCell,
    },
    function (
      err: any,
      data: {
        Orders: OrderType[]
        OrderDetails: OrderDetails[]
      }
    ) {
      const orders = data.Orders.map((order: OrderType) => {
        const orderDetalis = data.OrderDetails.filter(
          (orderline) => orderline.orderId === order.id
        )

        return {
          ...order,
          orderDetalis,
        }
      })

      res.json(orders)
    }
  )
}
