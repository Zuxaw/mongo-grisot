import mongoose from "mongoose";

// Adapt mongoose to typescript type 
interface MetadataAttrs {
    timestamp: string,
    latitude: number,
    longitude: number
}

interface MetadataModel extends mongoose.Model<MetadataDoc> {
    build(attrs: MetadataAttrs): MetadataDoc;
}

interface MetadataDoc extends mongoose.Document {
    timestamp: string,
    latitude: number,
    longitude: number
}

const metadataSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, {versionKey: false});
metadataSchema.statics.build = (attrs: MetadataAttrs) => {
    return new Metadata(attrs);
};

const Metadata = mongoose.model<MetadataDoc, MetadataModel>('Metadata', metadataSchema);

export { Metadata };

