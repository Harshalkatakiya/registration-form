import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    const client = new MongoClient(process.env.DB_HOST);
    try {
        await client.connect();
        const database = client.db(process.env.MONGODBDB);
        const table = database.collection(process.env.collection);
        const jsonData = await request.json();
        await table.insertOne(jsonData);
        response.status(201).json({ message: "Data inserted successfully.", status:201});
        return NextResponse.next();
    } finally {
        await client.close();
    }
}