import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/invoice/clear',
    async (req: Request, res: Response) => {
        const _id = req.query._id;
        if (!_id){
            return res.status(400).send("Please specify the id");
        }

        console.log(getTime()+'GET: Delete Invoice: '+ _id);
        const query = await Invoice.deleteOne({_id});

        console.log(getTime()+"GET: This invoice was deleted");
        res.status(200).send(query);
    }
)

export { router as deleteOneInvoice };