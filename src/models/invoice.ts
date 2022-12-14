import mongoose from "mongoose";

// Adapt mongoose to typescript type 
interface InvoiceAttrs {
    invoiceName: string,
    client?: string,
    amount?: number,
    invoiceDate?: number,
    paymentDate?: number,
}

interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
    build(attrs: InvoiceAttrs): InvoiceDoc;
}

interface InvoiceDoc extends mongoose.Document {
    invoiceName: string,
    client?: string,
    amount?: number,
    invoiceDate?: number,
    paymentDate?: number,
}

const invoiceSchema = new mongoose.Schema({
    invoiceName: {
        type: String,
        required: true
    },
    client: String,
    amount: Number,
    invoiceDate: {
        type: Number,
        default: new Date().getTime()
    },
    paymentDate: Number
}, {versionKey: false});
invoiceSchema.statics.build = (attrs: InvoiceAttrs) => {
    return new Invoice(attrs);
};

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>('Invoice', invoiceSchema);

export { Invoice };
