"use client";

import { useEffect, useState } from 'react';

interface Snippet {
  _id: string;
  docId: string;
  code: string;
  language: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('/api/snippets');
        if (response.ok) {
          const data = await response.json();
          setSnippets(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError('Failed to fetch snippets');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold mb-4">Saved Snippets</h1>
        {snippets.length > 0 ? (
          <ul>
            {snippets.map((snippet) => (
              <li key={snippet._id} className="mb-4 p-4 border border-gray-300 rounded">
                <p><strong>Doc ID:</strong> {snippet.docId}</p>
                <p><strong>Language:</strong> {snippet.language}</p>
                <pre className="bg-gray-200 p-2 rounded">{snippet.code}</pre>
                <p><strong>Saved by User ID:</strong> {snippet.userId}</p>
                <p><strong>Created At:</strong> {new Date(snippet.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(snippet.updatedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No snippets found.</p>
        )}
      </div>
    </div>
  );
}