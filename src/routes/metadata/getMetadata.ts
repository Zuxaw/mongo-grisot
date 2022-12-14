import express, { Request, Response } from 'express';
import { Metadata } from '../../models/metadata';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/metadata',
    async (req: Request, res: Response) => {
        console.log(getTime()+'GET: Get All metadata');
        
        const query = await Metadata.find();
        if (!query) {
            console.log("No metadata found!");
            return res.status(400).send("No metadata found.");
        }

        console.log(getTime()+"GET: All Metadata returned");
        res.status(200).send(query);
    }
)

export { router as getMetadata };

