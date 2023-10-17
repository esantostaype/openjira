import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
	message: string
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({
        message: 'No tiene acceso a este servicio.'
    })
}