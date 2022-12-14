import express, { Request, Response } from 'express';
import { Invoice } from '../../models/invoice';
import { getTime } from '../../tools/time';

const router = express.Router();

router.get(
    '/api/invoices',
    async (req: Request, res: Response) => {
        console.log(getTime()+'GET: Get all Invoice');

        let role;
        if (req.query.role) {
            role = req.query.role;
            console.log(role);
        }

        let limit: number = 500;
        if (req.query.limit) {
            limit = +req.query.limit;
            console.log(limit);
            if (!limit) {
                return res.status(400).send("Bad request limit is not a number");
            }
        }

        let query: any;
        if (role && req.query.with_hidden_data && req.query.with_hidden_data === "true")
            query = await Invoice.find({role: {$in: role}}).limit(limit);
        else if (role)
            query = await Invoice.find({role: {$in: role}}).select("-issuesOpened -issuesSolved -vector_tags").limit(limit);
        else if (req.query.with_hidden_data && req.query.with_hidden_data === "true")
            query = await Invoice.find().limit(limit);
        else
            query = await Invoice.find().select("-issuesOpened -issuesSolved -vector_tags").limit(limit);

        if (!query) {
            console.log("No invoice found!");
            return res.status(400).send("No invoice found.");
        }

        console.log(getTime()+"GET: Invoice list returned");
        res.status(200).send(query);
    }
)

export { router as getAllInvoice };