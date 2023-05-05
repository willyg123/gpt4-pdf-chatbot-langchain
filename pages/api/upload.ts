import { upload_embedding } from '@/scripts/upload-embedding';
import { writeFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    let chunks: Uint8Array[] = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);
    
    let filename = decodeURIComponent(req.query.filename as string);
    let fileBlob = new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" });

    await upload_embedding(filename, fileBlob);

    res.status(200).json({ message: 'success' });
}