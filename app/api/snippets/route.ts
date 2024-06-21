import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const snippets = await db.collection('snippets').find({}).toArray();
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    console.error('Error retrieving snippets:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to retrieve snippets', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to retrieve snippets', details: String(error) }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body) {
      throw new Error('Request body is empty');
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('snippets').insertOne(body);

    if (!result.acknowledged || !result.insertedId) {
      throw new Error('Failed to insert document');
    }

    const insertedDocument = await db.collection('snippets').findOne({ _id: result.insertedId });
    return NextResponse.json(insertedDocument, { status: 201 });
  } catch (error) {
    console.error('Error saving snippet:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to save snippet', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to save snippet', details: String(error) }, { status: 500 });
    }
  }
}