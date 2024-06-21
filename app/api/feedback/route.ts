import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const docId = searchParams.get('docId');
    const rating = searchParams.get('rating');
    const comment = searchParams.get('comment');

    const client = await clientPromise;
    const db = client.db();

    const query: any = {};
    if (docId) query.docId = docId;
    if (rating) query.rating = rating;
    if (comment) query.comment = comment;

    const feedbacks = await db.collection('feedbacks').find(query).toArray();
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error('Error retrieving feedback:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to retrieve feedback', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to retrieve feedback', details: String(error) }, { status: 500 });
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
    const result = await db.collection('feedbacks').insertOne(body);

    if (!result.acknowledged || !result.insertedId) {
      throw new Error('Failed to insert document');
    }

    const insertedDocument = await db.collection('feedbacks').findOne({ _id: result.insertedId });
    return NextResponse.json(insertedDocument, { status: 201 });
  } catch (error) {
    console.error('Error saving feedback:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to save feedback', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to save feedback', details: String(error) }, { status: 500 });
    }
  }
}