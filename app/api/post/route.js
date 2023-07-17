const mongoose = require('mongoose');
import { NextResponse } from 'next/server';

let ParticipatesCollection;
let Counter;
try {
    mongoose.connect('mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/avsar', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const counterSchema = new mongoose.Schema({
        _id: { type: String, required: true },
        sequence_value: { type: Number, default: 1 },
    });
    Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);
    ParticipatesCollection = mongoose.model('participates');
} catch (error) {
    console.log(error);
}
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
        const prefix = 'AVSAR' + capitalizeFirstLetter(body.institute) + capitalizeFirstLetter(body.eventtype) + capitalizeFirstThreeLetters(body.groupEvent); // Custom prefix
        const registrationID = await getNextSequenceValue('registrationID', prefix);
        const ParticipatesCollectionObj = new ParticipatesCollection({
            registrationID,
            ...body,
        });
        await ParticipatesCollectionObj.save();
        return NextResponse.json({ ok: true, text: `Dear ${body.full_name1},<br>Thank you for registering for the ${body.groupEvent} event. Your registration has been confirmed.<br><strong>Your Registration Number: ${registrationID}</strong>` });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export async function GET(req, res) {
    try {
        const data = await ParticipatesCollection.find({});
        return NextResponse.json({ ok: true, data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}