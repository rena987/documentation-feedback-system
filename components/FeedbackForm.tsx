import { useState } from 'react';

interface FeedbackFormProps {
  docId: string;
}

export default function FeedbackForm({ docId }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState({ rating: '', comment: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...feedback, docId }),
    });
    if (res.ok) {
      setMessage('Feedback submitted successfully');
      setFeedback({ rating: '', comment: '' });
    } else {
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Rating:</label>
        <select
          value={feedback.rating}
          onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="like">Like</option>
          <option value="dislike">Dislike</option>
        </select>
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={feedback.comment}
          onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
          className="border p-2 rounded w-full"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
