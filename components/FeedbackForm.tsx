import { useState } from 'react';

interface FeedbackFormProps {
  docId: string;
  onSubmit: (feedback: { rating: number; comment: string }) => Promise<void>;
}

export default function FeedbackForm({ docId, onSubmit }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ rating: feedback.rating, comment: feedback.comment });
      setMessage('Feedback submitted successfully');
      setFeedback({ rating: 0, comment: '' });
    } catch (error) {
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Rating:</label>
        <select
          value={feedback.rating}
          onChange={(e) => setFeedback({ ...feedback, rating: Number(e.target.value) })}
          className="border p-2 rounded"
        >
          <option value={0}>Select</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
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