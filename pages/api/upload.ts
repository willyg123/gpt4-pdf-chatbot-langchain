import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    let file = req.body.file;

    console.log(file)

    res.status(200).json({ message: 'success' });
}