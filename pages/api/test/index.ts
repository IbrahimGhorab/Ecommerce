import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import credentials from '../../../credentials.json'

// type Data = {
//   name: string
// }

export default async function handeler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

  //decodeing the crdentials in .env file
  const decodedCrdentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  // Initialize Auth
  await doc.useServiceAccountAuth(decodedCrdentials)

  //load all spreadSheet info
  await doc.loadInfo()

  try {
    const { order } = req.body
    const { orderDetails, ...values } = order

    //working with sheets
    const orderSheet = doc.sheetsByTitle['Orders']
    const orderDetailsSheet = doc.sheetsByTitle['OrderDetails']

    //create id for evry order
    const orderId = uuid()

    //working with Rows
    const orderRow = await orderSheet.addRow({
      ...values,
      id: orderId,
    })
    console.log(orderDetails)

    for (let i = 0; i < orderDetails.length; i++) {
      const orderDetailsRow = await orderDetailsSheet.addRow({
        id: uuid(),
        orderId: orderId,
        productId: orderDetails[i].id,
        quantity: orderDetails[i].quantity,
      })
    }

    console.log(orderDetails)
    res.status(200).json({ name: 'date created' })
  } catch (error) {
    console.log(error)
    // res.status(500).send(error)
  }
}
