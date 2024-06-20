"use client"

import { useEffect, useState } from 'react';

interface Feedback {
  _id: string;
  docId: string;
  rating: string;
  comment: string;
}

export default function Admin() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [docId, setDocId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      let query = '/api/feedback?';
      if (docId) query += `docId=${docId}&`;
      if (rating) query += `rating=${rating}&`;
      if (comment) query += `comment=${comment}&`;

      const res = await fetch(query);
      const data = await res.json();

      // Ensure that the data is an array
      if (Array.isArray(data)) {
        setFeedback(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    };

    fetchFeedback();
  }, [docId, rating, comment]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <label>Filter by Doc ID:</label>
        <input
          type="text"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label>Filter by Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="like">Like</option>
          <option value="dislike">Dislike</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Filter by Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <ul>
        {feedback.map((fb) => (
          <li key={fb._id} className="mb-4 border p-4 rounded shadow">
            <p><strong>Doc ID:</strong> {fb.docId}</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Comment:</strong> {fb.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}