import express from "express";
import { json } from "body-parser";
import mongoose from 'mongoose';
import { createInvoiceRouter } from "./routes/invoice/createInvoice";
import { getAllInvoice } from "./routes/invoice/getAllInvoice";
import { getInvoiceById } from "./routes/invoice/getInvoiceById"
import { editInvoice } from "./routes/invoice/editInvoice";
import { deleteOneInvoice } from "./routes/invoice/deleteOneInvoice";
import { deleteAllInvoices } from "./routes/invoice/deleteAllInvoices";
import { getTime } from "./tools/time";


const app = express();


app.use(json());

// Invoice :
app.use(createInvoiceRouter);
app.use(getAllInvoice);
app.use(getInvoiceById);
app.use(editInvoice);
app.use(deleteOneInvoice);
app.use(deleteAllInvoices);


const start = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log(getTime()+"Connected to MongoDb");
  } catch (err){
    console.error(err);
  }

  app.listen(5001, () => {
    console.log(getTime()+"Listening on port 5001!");
  });
}

start();


