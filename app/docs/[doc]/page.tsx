"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import io from 'socket.io-client';
import FeedbackForm from '../../../components/FeedbackForm';

const socket = io('http://localhost:3001');

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  // Add more languages as needed
];

export default function Doc() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const doc = params?.doc as string;
  const [code, setCode] = useState('// Write your code here\n');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [pyodide, setPyodide] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    socket.emit('join', doc);

    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off('code-update');
    };
  }, [doc]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    socket.emit('code-change', { docId: doc, code: newCode });
  };

  useEffect(() => {
    if (language === 'python' && !pyodide) {
      (async () => {
        const pyodideScript = document.createElement('script');
        pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js';
        pyodideScript.onload = async () => {
          const pyodideInstance = await (window as any).loadPyodide();
          setPyodide(pyodideInstance);
        };
        document.body.appendChild(pyodideScript);
      })();
    }
  }, [language, pyodide]);

  const runCode = async () => {
    try {
      if (language === 'javascript') {
        const result = eval(code);
        setOutput(String(result));
      } else if (language === 'python' && pyodide) {
        const result = await pyodide.runPythonAsync(code);
        setOutput(result);
      } else {
        setOutput('Code execution not supported for this language in the demo.');
      }
    } catch (error) {
      setOutput(String(error));
    }
  };

  const saveSnippet = async () => {
    if (!session) {
      alert('Please sign in to save code snippets.');
      return;
    }
  
    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docId: doc, code, language, userId: session.user.id }),
      });
  
      if (response.ok) {
        alert('Code snippet saved successfully.');
      } else {
        const errorData = await response.json();
        console.error('Error saving snippet:', errorData);
        alert('Failed to save code snippet.');
      }
    } catch (error) {
      console.error('Error saving snippet:', error);
      alert('Failed to save code snippet.');
    }
  };
  

  const handleFeedbackSubmit = async (feedback: { rating: number; comment: string }) => {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ docId: doc, ...feedback }),
    });
    if (response.ok) {
      const newFeedback = await response.json();
      setComments((prevComments) => [...prevComments, newFeedback]);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/feedback?docId=${doc}`);
        if (response.ok) {
          const { averageRating, feedbacks } = await response.json();
          setAverageRating(averageRating);
          setComments(feedbacks || []);
        } else {
          setAverageRating(0);
          setComments([]);
        }
      } catch (error) {
        setAverageRating(0);
        setComments([]);
      }
    };
    fetchComments();
  }, [doc]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
        <Link href="/" className="back-button">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">Documentation: {doc}</h1>
        {session ? (
          <>
            <button onClick={() => signOut()} className="mb-4 bg-red-500 text-white p-2 rounded">
              Sign Out
            </button>
            <p>Signed in as {session.user.email}</p>
          </>
        ) : (
          <button onClick={() => signIn('google', { callbackUrl: `/docs/${doc}` })} className="mb-4 bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        )}
        <p>Below is an interactive code editor. Try editing the code and see the live preview:</p>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Select Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <MonacoEditor 
          height="300px" 
          language={language} 
          value={code}
          onChange={(value) => handleCodeChange(value || '')}
          theme="vs-dark"
        />
        <button onClick={runCode} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Run Code
        </button>
        <button onClick={saveSnippet} className="mt-4 bg-green-500 text-white p-2 rounded ml-4">
          Save Snippet
        </button>
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
        <FeedbackForm docId={doc} onSubmit={handleFeedbackSubmit} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
          <p><strong>Average Rating:</strong> {averageRating !== null ? averageRating : 'Loading...'}</p>
          {comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <p><strong>Rating:</strong> {comment.rating}</p>
              <p><strong>Comment:</strong> {comment.comment}</p>
            </div>
          )) : <p>No feedback yet.</p>}
        </div>
      </div>
    </div>
  );
}