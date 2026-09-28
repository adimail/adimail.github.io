import React, { useState, useEffect, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post, formatDate } from '../lib/posts';
import { Layout } from './Layout';
import { MobiusStrip } from './MobiusStrip';

interface BlogLayoutProps {
  post: Post;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children)) {
    return extractText((children.props as any).children);
  }
  return '';
};

export const BlogLayout: React.FC<BlogLayoutProps> = ({ post }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const headings = useMemo(() => {
    const lines = post.content.split('\n');
    const items: HeadingItem[] = [];
    const counts: Record<string, number> = {};

    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim().replace(/[*_`]/g, '');
        let baseSlug = slugify(rawText);
        if (!baseSlug) baseSlug = 'heading';

        let id = baseSlug;
        if (counts[baseSlug]) {
          counts[baseSlug]++;
          id = `${baseSlug}-${counts[baseSlug]}`;
        } else {
          counts[baseSlug] = 1;
        }

        items.push({ id, text: rawText, level });
      }
    });

    return items;
  }, [post.content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPos) {
          current = headings[i].id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getHeadingId = (children: React.ReactNode) => {
    const text = extractText(children);
    return slugify(text);
  };

  return (
    <Layout className="!max-w-[1200px] !px-6 !my-0 py-12 md:py-0 text-[15px] leading-relaxed relative">
      {headings.length > 0 && (
        <aside
          className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative py-4 px-2">
            {!isHovered ? (
              <div className="flex flex-col items-end gap-2.5 cursor-pointer py-2">
                {headings.map((h) => {
                  const isActive = activeId === h.id;
                  const widthClass =
                    h.level === 1
                      ? 'w-7'
                      : h.level === 2
                      ? 'w-5'
                      : 'w-3.5';

                  return (
                    <div
                      key={h.id}
                      className={`h-0.5 rounded-full transition-all duration-200 ${widthClass} ${
                        isActive
                          ? 'bg-zinc-900 scale-x-110 origin-right'
                          : 'bg-zinc-300'
                      }`}
                    />
                  );
                })}
              </div>
            ) : (
              <nav className="w-64 max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-sm border border-zinc-200 p-4 shadow-xl rounded-md transition-all duration-200">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3 px-1">
                  Contents
                </div>
                <div className="flex flex-col space-y-1.5">
                  {headings.map((h) => {
                    const isActive = activeId === h.id;
                    const paddingClass =
                      h.level === 1
                        ? 'pl-1 font-medium'
                        : h.level === 2
                        ? 'pl-3'
                        : 'pl-5 text-xs';

                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => scrollToHeading(h.id)}
                        className={`text-left text-xs transition-colors py-1 cursor-pointer truncate ${paddingClass} ${
                          isActive
                            ? 'text-zinc-950 font-semibold'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                        title={h.text}
                      >
                        {h.text}
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>
        </aside>
      )}

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
                h1: ({ children }) => {
                  const id = getHeadingId(children);
                  return (
                    <h1
                      id={id}
                      className="font-serif italic text-2xl sm:text-3xl font-normal text-black mt-10 mb-4 scroll-mt-24"
                    >
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const id = getHeadingId(children);
                  return (
                    <h2
                      id={id}
                      className="font-serif italic text-xl sm:text-2xl font-normal text-black mt-8 mb-3 scroll-mt-24"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const id = getHeadingId(children);
                  return (
                    <h3
                      id={id}
                      className="font-sans font-bold text-base sm:text-lg text-black mt-6 mb-2 scroll-mt-24"
                    >
                      {children}
                    </h3>
                  );
                },
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
                  <figure className="my-8 flex flex-col items-center">
                    <img
                      src={src}
                      alt={alt || ''}
                      className="w-auto max-w-full max-h-[60vh] object-contain border border-zinc-200 block mx-auto"
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
