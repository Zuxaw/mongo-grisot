import { json } from "body-parser";
import express from "express";
import mongoose from 'mongoose';
import { createMetadata } from "./routes/metadata/createMetadata";
import { getMetadata } from "./routes/metadata/getMetadata";
import { getMetadataByTimestamp } from "./routes/metadata/getMetadataByTimestamp";
import { getTime } from "./tools/time";

const app = express();

app.use(json());

// Images metadata:
app.use(createMetadata);
app.use(getMetadataByTimestamp);
app.use(getMetadata);

const start = async(ip: string) => {
  try {
    await mongoose.connect('mongodb://' + ip + ':27017');
    console.log(getTime()+"Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(5001, () => {
    console.log(getTime()+"Listening on port 5001!");
  });
}

start('172.16.244.211');
