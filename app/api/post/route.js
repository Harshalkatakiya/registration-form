import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    const client = new MongoClient("mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/");
    try {
        await client.connect();
        const database = client.db("avsar");
        const table = database.collection("participates");
        const jsonData = await request.json();
        await table.insertOne(jsonData);
        response.status(201).json({ message: "Data inserted successfully.", status: 201 });
        return NextResponse.next();
    } finally {
        await client.close();
    }
}