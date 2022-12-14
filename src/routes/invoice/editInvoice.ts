import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.post(
    '/api/invoice/edit',
    async (req: Request, res: Response) => {
        const { invoiceName, client, amount, paymentDate, _id } = req.body;

        console.log(getTime() + 'POST: Edit Invoice: ' + _id);

        const targetInvoice = await Invoice.findOne({ _id });
        if (!targetInvoice) {
            console.log('Invoice not found!');
            return res.status(404).send('Invoice not found.');
        }
        
        let query = await Invoice.findOneAndUpdate({_id}, {
            invoiceName,
            client,
            amount,
            paymentDate
        });

        console.log(getTime()+'POST: Invoice was edited');
        res.status(200).send(query);
    }
)

export { router as editInvoice };

