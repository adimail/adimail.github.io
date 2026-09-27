import React from 'react';
import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post, formatDate } from '../lib/posts';
import { Layout } from './Layout';
import { MobiusStrip } from './MobiusStrip';

interface BlogLayoutProps {
  post: Post;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({ post }) => {
  return (
    <Layout className="!max-w-[1200px] !px-6 !my-0 py-12 md:py-0 text-[15px] leading-relaxed">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-2 min-w-0 py-24">
          <div className="mb-8">
            <Link
              to="/writings"
              className="text-xs text-blue-700 inline-flex items-center gap-1"
            >
              &larr; Back to all writings
            </Link>
          </div>

          <header className="mb-8">
            <h1 className="font-serif italic text-3xl sm:text-4xl font-normal text-black mb-3 leading-tight">
              {post.title}
            </h1>
            <div className="text-xs text-zinc-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          <hr className="h-[1px] w-full bg-zinc-200 border-0 mb-8" />

          <article className="space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-serif italic text-2xl sm:text-3xl font-normal text-black mt-10 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-serif italic text-xl sm:text-2xl font-normal text-black mt-8 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-sans font-bold text-base sm:text-lg text-black mt-6 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-zinc-800 leading-relaxed mb-5">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-800 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 space-y-1.5 text-zinc-800 my-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-zinc-900 pl-4 my-6 italic text-zinc-700">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <figure className="my-8">
                    <img
                      src={src}
                      alt={alt || ''}
                      className="w-full h-auto border border-zinc-200 block"
                    />
                    {alt && (
                      <figcaption className="text-center text-xs text-zinc-500 mt-2">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                ),
                pre: ({ children }) => (
                  <pre className="bg-zinc-100 border border-zinc-200 p-4 overflow-x-auto text-xs font-mono text-zinc-900 my-6 leading-normal rounded-sm">
                    {children}
                  </pre>
                ),
                code: ({ className, children, ...props }) => {
                  const isBlock = Boolean(className);
                  if (isBlock) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className="bg-zinc-100 text-zinc-900 font-mono text-xs px-1.5 py-0.5 border border-zinc-200 rounded-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-zinc-200 text-xs text-left">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="p-2.5 font-semibold text-zinc-900 border border-zinc-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-2.5 text-zinc-700 border border-zinc-200">
                    {children}
                  </td>
                ),
                hr: () => <hr className="h-[1px] w-full bg-zinc-200 border-0 my-8" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </div>

        <div className="hidden lg:flex lg:col-span-3 sticky top-0 h-screen items-center justify-center">
          <MobiusStrip />
        </div>
      </div>
    </Layout>
  );
};
