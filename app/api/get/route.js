import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const client = new MongoClient(process.env.DB_HOST);
    try {
        await client.connect();
        const database = client.db(process.env.MONGODBDB);
        const table = database.collection(process.env.collection);
        const data = await table.find().toArray();
        return NextResponse.json(data);
    } finally {
        await client.close();
    }
}

/* export async function POST(request, res) {
    const uri =
        "mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("avsar");
        const table = database.collection("participates");
        const jsonData = await request.json();
        await table.insertOne(jsonData);
        res.status(201).json({ message: "Data inserted successfully." });
        return NextResponse.next();
    } finally {
        await client.close();
    }
} */
