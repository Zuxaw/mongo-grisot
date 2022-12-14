import express, { Request, Response } from 'express';
import { Metadata } from '../../models/metadata';
import { getTime } from '../../tools/time';

const router = express.Router();

router.post(
    '/api/metadata/create',
    async (req: Request, res: Response) => {
        console.log(getTime()+'POST: Metadata creation');
        const { timestamp, latitude, longitude } = req.body;

        const existingMetadata = await Metadata.findOne({ timestamp });
        if (existingMetadata) {
            console.log('Metadata already exist');
            return res.send('Metadata already exist');
        }

        const metadata = Metadata.build({
            timestamp,
            latitude,
            longitude
        });
        await metadata.save();

        console.log(getTime()+'POST: Metadata is created');
        res.status(201).send(metadata);
    }
)

export { router as createMetadata };

