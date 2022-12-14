import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.post(
    '/api/invoice/create',
    async (req: Request, res: Response) => {
        console.log(getTime()+'POST: Invoice creation');
        const { invoiceName, client, amount, paymentDate } = req.body;

        const existingInvoice = await Invoice.findOne({ invoiceName });
        if (existingInvoice) {
            console.log('Invoice already exist');
            return res.send('Invoice already exist');
        }

        const invoice = Invoice.build({ 
            invoiceName,
            client,
            amount,
            invoiceDate: new Date().getTime(),
            paymentDate
        });
        await invoice.save();

        console.log(getTime()+'POST: Invoice is created');
        res.status(201).send(invoice)
    }
)

export { router as createInvoiceRouter };