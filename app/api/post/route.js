import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

export async function POST(request, response) {
    const client = new MongoClient('mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/avsar');
    try {
        await client.connect();
        const database = client.db('avsar');
        const table = database.collection("users");
        const jsonData = await request.json();
        await table.insertOne(jsonData);
        return NextResponse.json({ message: "Data inserted successfully." });
    } finally {
        await client.close();
    }
}

export async function GET(request, response) {
    const client = new MongoClient('mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/avsar');
    try {
        await client.connect();
        const database = client.db('avsar');
        const table = database.collection("users");
        const data = await table.find({}).toArray();
        return NextResponse.json({ ok: true, data });
    } finally {
        await client.close();
    }
}
