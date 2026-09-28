import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  FileText,
  Download,
  ExternalLink,
  Music,
} from 'lucide-react';
import { CustomVideoPlayer } from '../components/CustomVideoPlayer';

const NOTES_URL = 'https://notesource.pages.dev/notes.md';
const NOTES_BASE_URL = 'https://notesource.pages.dev';

function detectMediaType(
  url: string
): 'video' | 'audio' | 'pdf' | 'image' | 'unknown' {
  const cleanUrl = (url || '').split('?')[0].split('#')[0].toLowerCase();
  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanUrl)) return 'video';
  if (/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(cleanUrl)) return 'audio';
  if (/\.pdf$/i.test(cleanUrl)) return 'pdf';
  if (/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(cleanUrl)) return 'image';
  return 'unknown';
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

async function loadNotesContent(): Promise<string> {
  const target = `${NOTES_URL}?t=${Date.now()}`;
  try {
    const res = await fetch(target);
    if (res.ok) {
      return await res.text();
    }
  } catch {}

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
  const proxyRes = await fetch(proxyUrl);
  if (!proxyRes.ok) {
    throw new Error(`Failed to fetch notes: ${proxyRes.status}`);
  }
  return await proxyRes.text();
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface NotesLayoutProps {
  children: React.ReactNode;
}

export function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[760px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="text-xs text-zinc-500 hover:text-black font-medium transition-colors"
            >
              &larr; Aditya
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-mono text-xs text-zinc-900 font-semibold">
              notes.md
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-white relative">
        {children}
      </main>
    </div>
  );
}

export const NotesPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>('');
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    loadNotesContent()
      .then((text) => {
        if (isMounted) {
          setContent(text);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Failed to load notes');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const headings = useMemo(() => {
    if (!content) return [];
    const lines = content.split('\n');
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
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 140;
      let current = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPos) {
          current = headings[i].id;
        }
      }
      setActiveId(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (el && container) {
      const offset = 80;
      const targetTop = el.offsetTop - offset;
      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
  };

  const cleanBase = useMemo(() => NOTES_BASE_URL.replace(/\/+$/, ''), []);

  const resolveMediaUrl = (url: string) => {
    const raw = (url || '').trim();
    if (!raw) return '';
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }
    if (raw.startsWith('/')) {
      return `${cleanBase}${raw}`;
    }
    return `${cleanBase}/${raw}`;
  };

  const getHeadingId = (children: React.ReactNode) => {
    const text = extractText(children);
    return slugify(text);
  };

  const markdownComponents = useMemo(
    () => ({
      h1: ({ node, children, ...props }: any) => {
        const id = getHeadingId(children);
        return (
          <h1
            id={id}
            data-source-start={node?.position?.start?.offset}
            data-source-end={node?.position?.end?.offset}
            className="font-serif italic text-2xl sm:text-3xl font-normal text-black mt-10 mb-4 leading-tight tracking-normal cursor-pointer scroll-mt-24"
            {...props}
          >
            {children}
          </h1>
        );
      },
      h2: ({ node, children, ...props }: any) => {
        const id = getHeadingId(children);
        return (
          <h2
            id={id}
            data-source-start={node?.position?.start?.offset}
            data-source-end={node?.position?.end?.offset}
            className="font-serif italic text-xl sm:text-2xl font-normal text-black mt-8 mb-3 leading-snug tracking-normal cursor-pointer scroll-mt-24"
            {...props}
          >
            {children}
          </h2>
        );
      },
      h3: ({ node, children, ...props }: any) => {
        const id = getHeadingId(children);
        return (
          <h3
            id={id}
            data-source-start={node?.position?.start?.offset}
            data-source-end={node?.position?.end?.offset}
            className="font-sans font-bold text-base sm:text-lg text-black mt-6 mb-2 leading-snug cursor-pointer scroll-mt-24"
            {...props}
          >
            {children}
          </h3>
        );
      },
      h4: ({ node, children, ...props }: any) => (
        <h4
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="font-sans font-semibold text-sm sm:text-base text-zinc-900 mt-5 mb-2 cursor-pointer"
          {...props}
        >
          {children}
        </h4>
      ),
      p: ({ node, children, ...props }: any) => (
        <p
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="text-[15px] text-zinc-800 leading-relaxed mb-5 cursor-pointer"
          {...props}
        >
          {children}
        </p>
      ),
      strong: ({ children, ...props }: any) => (
        <strong className="font-semibold text-black" {...props}>
          {children}
        </strong>
      ),
      em: ({ children, ...props }: any) => (
        <em className="italic text-zinc-900" {...props}>
          {children}
        </em>
      ),
      ul: ({ children, ...props }: any) => (
        <ul
          className="list-disc pl-5 space-y-1.5 text-zinc-800 my-4 text-[15px]"
          {...props}
        >
          {children}
        </ul>
      ),
      ol: ({ children, ...props }: any) => (
        <ol
          className="list-decimal pl-5 space-y-1.5 text-zinc-800 my-4 text-[15px]"
          {...props}
        >
          {children}
        </ol>
      ),
      li: ({ node, children, ...props }: any) => (
        <li
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="leading-relaxed cursor-pointer"
          {...props}
        >
          {children}
        </li>
      ),
      blockquote: ({ node, children, ...props }: any) => (
        <blockquote
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="border-l-2 border-zinc-900 pl-4 my-6 italic text-zinc-700 text-[15px] cursor-pointer"
          {...props}
        >
          {children}
        </blockquote>
      ),
      a: ({ href, children, ...props }: any) => {
        const rawHref = href || '';
        const resolvedHref = resolveMediaUrl(rawHref);
        const type = detectMediaType(rawHref);

        if (type === 'pdf') {
          return (
            <div className="my-6 p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-zinc-900 block truncate">
                    {children || rawHref.split('/').pop()}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    PDF Document
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>View PDF</span>
                </a>
                <a
                  href={resolvedHref}
                  download
                  className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-600"
                  title="Download"
                >
                  <Download size={14} />
                </a>
              </div>
            </div>
          );
        }

        if (type === 'video') {
          return (
            <figure className="my-6">
              <CustomVideoPlayer
                src={resolvedHref}
                className="w-full border border-zinc-200 shadow-sm"
              />
              {children && (
                <figcaption className="text-center text-xs text-zinc-500 mt-2 font-mono">
                  {children}
                </figcaption>
              )}
            </figure>
          );
        }

        if (type === 'audio') {
          return (
            <div className="my-4 p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Music size={18} />
              </div>
              <audio src={resolvedHref} controls className="flex-1 h-9" />
            </div>
          );
        }

        return (
          <a
            href={resolvedHref}
            target={resolvedHref.startsWith('http') ? '_blank' : undefined}
            rel={
              resolvedHref.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
            className="text-blue-700 hover:text-blue-800 underline underline-offset-4 decoration-blue-700/40 hover:decoration-blue-800 transition-colors"
            {...props}
          >
            {children}
          </a>
        );
      },
      img: ({ src, alt, ...props }: any) => {
        const rawSrc = src || '';
        const resolvedSrc = resolveMediaUrl(rawSrc);
        const type = detectMediaType(rawSrc);

        if (type === 'video') {
          return (
            <figure className="my-8">
              <CustomVideoPlayer
                src={resolvedSrc}
                className="w-full border border-zinc-200 shadow-sm"
              />
              {alt && (
                <figcaption className="text-center text-xs text-zinc-500 mt-2 font-mono">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }

        if (type === 'audio') {
          return (
            <div className="my-6 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Music size={20} />
              </div>
              <div className="flex-1 min-w-0">
                {alt && (
                  <p className="text-xs font-bold text-zinc-900 mb-1 truncate">
                    {alt}
                  </p>
                )}
                <audio src={resolvedSrc} controls className="w-full h-8" />
              </div>
            </div>
          );
        }

        if (type === 'pdf') {
          return (
            <div className="my-8 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 shadow-sm">
              <div className="p-3 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-red-500" />
                  <span className="text-xs font-mono font-bold text-zinc-800 truncate">
                    {alt || rawSrc.split('/').pop()}
                  </span>
                </div>
                <a
                  href={resolvedSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-mono font-bold bg-white border border-zinc-200 rounded text-zinc-700 hover:text-black flex items-center gap-1"
                >
                  <ExternalLink size={11} />
                  <span>Open Full PDF</span>
                </a>
              </div>
              <iframe
                src={resolvedSrc}
                title={alt || 'PDF Viewer'}
                className="w-full h-[520px] bg-white border-0"
              />
            </div>
          );
        }

        return (
          <figure className="my-8 flex flex-col items-center">
            <img
              src={resolvedSrc}
              alt={alt || ''}
              loading="lazy"
              className="w-auto max-w-full max-h-[60vh] object-contain border border-zinc-200 block mx-auto rounded-none shadow-sm"
              {...props}
            />
            {alt && (
              <figcaption className="text-center text-xs text-zinc-500 mt-2 font-mono">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      },
      pre: ({ node, children, ...props }: any) => (
        <pre
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="bg-zinc-100 border border-zinc-200 p-4 overflow-x-auto text-xs font-mono text-zinc-900 my-6 leading-normal rounded-sm cursor-pointer"
          {...props}
        >
          {children}
        </pre>
      ),
      code: ({ inline, className, children, ...props }: any) => {
        if (inline) {
          return (
            <code
              className="bg-zinc-100 text-zinc-900 font-mono text-xs px-1.5 py-0.5 border border-zinc-200 rounded-sm"
              {...props}
            >
              {children}
            </code>
          );
        }
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
      table: ({ children, ...props }: any) => (
        <div className="overflow-x-auto my-6">
          <table
            className="w-full border-collapse border border-zinc-200 text-xs text-left"
            {...props}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }: any) => (
        <thead
          className="bg-zinc-50 border-b border-zinc-200 text-zinc-900 font-semibold"
          {...props}
        >
          {children}
        </thead>
      ),
      tr: ({ node, children, ...props }: any) => (
        <tr
          data-source-start={node?.position?.start?.offset}
          data-source-end={node?.position?.end?.offset}
          className="cursor-pointer"
          {...props}
        >
          {children}
        </tr>
      ),
      th: ({ children, ...props }: any) => (
        <th
          className="p-2.5 font-semibold text-zinc-900 border border-zinc-200"
          {...props}
        >
          {children}
        </th>
      ),
      td: ({ children, ...props }: any) => (
        <td className="p-2.5 text-zinc-700 border border-zinc-200" {...props}>
          {children}
        </td>
      ),
      hr: ({ ...props }: any) => (
        <hr className="h-[1px] w-full bg-zinc-200 border-0 my-8" {...props} />
      ),
      input: ({ type, checked, ...props }: any) => {
        if (type === 'checkbox') {
          return (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mr-2 rounded accent-zinc-900 cursor-default align-middle"
              {...props}
            />
          );
        }
        return <input type={type} {...props} />;
      },
    }),
    [cleanBase]
  );

  return (
    <NotesLayout>
      {headings.length > 0 && !loading && !error && (
        <aside
          className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
        >
          <div className="relative py-4 px-2">
            {!isNavHovered ? (
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

      {loading ? (
        <div className="max-w-[760px] mx-auto px-6 sm:px-12 py-24 flex items-center justify-center">
          <p className="font-mono text-xs text-zinc-400">Loading notes...</p>
        </div>
      ) : error ? (
        <div className="max-w-[760px] mx-auto px-6 sm:px-12 py-24">
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm">
            <p className="font-semibold mb-1">Error fetching notes</p>
            <p className="text-xs font-mono">{error}</p>
          </div>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="h-[calc(100vh-56px)] overflow-y-auto bg-white text-zinc-900 selection:bg-zinc-200 selection:text-black w-full"
        >
          <article className="max-w-[760px] mx-auto px-6 sm:px-12 py-10 text-left select-text text-[15px] leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      )}
    </NotesLayout>
  );
};

