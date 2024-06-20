"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const documentation = [
  { title: 'Example Documentation 1', href: '/docs/example1' },
  { title: 'Example Documentation 2', href: '/docs/example2' },
  { title: 'Featured Documentation 1', href: '/docs/featured1' },
  { title: 'Featured Documentation 2', href: '/docs/featured2' },
  { title: 'Recently Viewed Documentation 1', href: '/docs/recent1' },
  { title: 'Recently Viewed Documentation 2', href: '/docs/recent2' },
  // Add more documentation links as needed
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocs, setFilteredDocs] = useState(documentation);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    const storedRecentDocs = localStorage.getItem('recentlyViewed');
    if (storedRecentDocs) {
      setRecentlyViewed(JSON.parse(storedRecentDocs));
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = documentation.filter(doc => doc.title.toLowerCase().includes(query));
    setFilteredDocs(filtered);
  };

  const handleViewDocument = (docHref: string) => {
    const updatedRecentDocs = [docHref, ...recentlyViewed.filter(href => href !== docHref)].slice(0, 5);
    setRecentlyViewed(updatedRecentDocs);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentDocs));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded text-center">
        <h1 className="text-4xl font-bold mb-4">Interactive Documentation Site</h1>
        <p className="mb-6 text-gray-700">Welcome to the interactive documentation site. Explore the docs below:</p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Featured Documentation</h2>
          <ul className="list-disc list-inside">
            {filteredDocs.filter(doc => doc.title.includes('Featured')).map(doc => (
              <li key={doc.href}>
                <Link href={doc.href} className="text-blue-500 hover:underline" onClick={() => handleViewDocument(doc.href)}>
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recently Viewed Documentation</h2>
          <ul className="list-disc list-inside">
            {recentlyViewed.map(href => {
              const doc = documentation.find(doc => doc.href === href);
              return doc ? (
                <li key={href}>
                  <Link href={href} className="text-blue-500 hover:underline" onClick={() => handleViewDocument(href)}>
                    {doc.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">All Documentation</h2>
          <ul className="list-disc list-inside">
            {filteredDocs.map(doc => (
              <li key={doc.href}>
                <Link href={doc.href} className="text-blue-500 hover:underline" onClick={() => handleViewDocument(doc.href)}>
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Link href="/snippets" className="bg-blue-500 text-white p-2 rounded">
            View Saved Snippets
          </Link>
        </div>
      </div>
    </div>
  );
}