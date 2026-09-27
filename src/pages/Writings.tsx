import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { getAllPosts, formatDayMonth, Post } from '../lib/posts';

export const Writings: React.FC = () => {
  const posts = getAllPosts();

  const postsByYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const date = new Date(post.date);
    const year = !isNaN(date.getTime()) ? String(date.getUTCFullYear()) : 'Other';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return Number(b) - Number(a);
  });

  return (
    <Layout footer className="max-w-[700px]">
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Writings
      </h1>
      <p className="mt-2 text-zinc-700">
        Essays, technical notes, and architectural post-mortems on systems, hardware, and engineering craft.
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />

      <section className="mt-8 space-y-12">
        {years.map((year) => (
          <div key={year}>
            <h2 className="font-serif italic text-2xl font-normal text-black mb-4">
              {year}
            </h2>
            <div className="space-y-3">
              {postsByYear[year].map((post) => (
                <div key={post.slug} className="flex items-baseline gap-3">
                  <span className="shrink-0 text-xs font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
                    {formatDayMonth(post.date)}
                  </span>
                  <Link
                    to="/writings/$slug"
                    params={{ slug: post.slug }}
                    className="text-[15px] text-zinc-900"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};
