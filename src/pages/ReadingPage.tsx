import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { Bookshelf } from '../components/Bookshelf';
import { booksData } from '../lib/books';

export const ReadingPage: React.FC = () => {
  const [openBookId, setOpenBookId] = useState<string | null>(null);

  const toggleBook = (id: string) => {
    setOpenBookId((prev) => (prev === id ? null : id));
  };

  return (
    <Layout footer className="!max-w-none !px-0 !my-0">
      <div className="max-w-[1200px] mx-auto px-5 pt-[90px]">
        <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
          <Link to="/">Aditya's</Link> Reading
        </h1>
        <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="font-serif italic text-2xl font-normal text-black mt-10 mb-5">
          Bookshelf ({booksData.length})
        </h2>
      </div>

      <Bookshelf />

      <div className="max-w-[1200px] mx-auto px-5 pb-[90px]">

        <ul className="list-disc pl-5 space-y-2 text-zinc-800">
          {booksData.map((book) => {
            const isOpen = openBookId === book.id;

            return (
              <li key={book.id}>
                <div>
                  <button
                    type="button"
                    onClick={() => toggleBook(book.id)}
                    className="text-left cursor-pointer inline text-[15px]"
                  >
                    <span>
                      {book.title}
                    </span>
                    <span className="text-zinc-400"> by {book.author}</span>
                  </button>

                  {isOpen && (
                    <blockquote className="border-l-2 border-zinc-300 pl-4 mt-2.5 mb-3 space-y-2 text-zinc-700 text-sm leading-relaxed">
                      {book.notes.map((note, idx) => (
                        <p key={idx}>{note}</p>
                      ))}
                    </blockquote>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};
