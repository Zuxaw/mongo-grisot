import express, { Request, Response } from 'express';
import { Metadata } from '../../models/metadata';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/metadata/:timestamp',
    async (req: Request, res: Response) => {
        console.log(getTime()+'GET: Get metadata for image with timestamp: '+req.params.timestamp);

        const query = await Metadata.findOne({timestamp: req.params.timestamp});
        if (!query) {
            console.log("No metadata found!");
            return res.status(400).send("No metadata found.");
        }

        console.log(getTime()+"GET: Metadata returned");
        res.status(200).send(query);
    }
)

export { router as getMetadataByTimestamp };

