/* import { MongoClient } from "mongodb";
import { NextResponse } from "next/server"; */

import { NextResponse } from 'next/server';

/* export async function POST(request, response) {
    const client = new MongoClient(process.env.DB_HOST);
    try {
        await client.connect();
        const database = client.db(process.env.MONGODBDB);
        const table = database.collection("users");
        const jsonData = await request.json();
        await table.insertOne(jsonData);
        response.status(201).json({ message: "Data inserted successfully." });
        return NextResponse.next();
    } finally {
        await client.close();
    }
} */

const mongoose = require('mongoose');

let ParticipatesCollection;

try {
    mongoose.connect('mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/avsar',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
    ParticipatesCollection = mongoose.model('participates');
} catch {
    const participatesCollectionSchema = new mongoose.Schema({}, { strict: false });
    ParticipatesCollection = mongoose.model('participates', participatesCollectionSchema);
}

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
  });
  
  const Counter = mongoose.model('Counter', counterSchema);
  
  async function getNextSequenceValue(sequenceName, prefix) {
    const counter = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return `${prefix}${counter.sequence_value}`;
  }

const capitalizeFirstLetter = str => `${str.charAt(0).toUpperCase()}`;
const capitalizeFirstThreeLetters = str => `${str.substr(0, 3).toUpperCase()}`;

export async function POST(req, res) {
    try {
        let body = await req.json()
        const prefix = 'AVSAR'+capitalizeFirstLetter(body.institute)+capitalizeFirstLetter(body.eventtype)+capitalizeFirstThreeLetters(body.groupEvent); // Custom prefix
        const registrationID = await getNextSequenceValue('registrationID', prefix);
        const ParticipatesCollectionObj = new ParticipatesCollection({
        registrationID,
        ...body,
        });
        //console.log(body)
        //const ParticipatesCollectionObj = new ParticipatesCollection(body);
        await ParticipatesCollectionObj.save();
        return NextResponse.json({ok:true, text: `Dear ${body.full_name1},<br>Thank you for registering for the ${body.groupEvent} event. Your registration has been confirmed.<br><strong>Your Registration Number: ${registrationID}</strong>`})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
