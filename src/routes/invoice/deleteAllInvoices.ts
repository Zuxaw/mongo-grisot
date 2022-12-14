import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/invoices/clear',
    async (req: Request, res: Response) => {
        console.log(getTime()+'GET: Delete all Invoice');
        const query = await Invoice.deleteMany();

        console.log(getTime()+ "GET: All invoice was deleted");
        res.status(200).send(query);
    }
)

export { router as deleteAllInvoices };