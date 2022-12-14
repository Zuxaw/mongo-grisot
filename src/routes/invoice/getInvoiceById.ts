import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/invoice',
    async (req: Request, res: Response) => {
        const _id = req.query._id;
        if (!_id) {
            return res.status(400).send("Please specify the id");
        }

        console.log(getTime()+'GET: Get Invoice by id'+ _id);

        let query: any;
        if (!req.query.with_hidden_data || req.query.with_hidden_data !== "true")
            query = await Invoice.findOne({ _id }).select("-issuesOpened -issuesSolved -vector_tags");
        else
            query = await Invoice.findOne({ _id });

        if (!query) {
            console.log("Invoice not found!");
            return res.status(404).send("Invoice not found.");
        }

        console.log(getTime()+'POST: Invoice by id is returned');
        res.status(200).send(query);
    }
)

export { router as getInvoiceById };