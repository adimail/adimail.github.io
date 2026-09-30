import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getMarkdownComponents } from '../components/getMarkdownComponents';

const NOTES_URL = 'https://notesource.pages.dev/notes.md';
const NOTES_BASE_URL = 'https://notesource.pages.dev';

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
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
              className="text-xs font-medium"
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

      <main className="flex-1 w-full">
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

  const markdownComponents = useMemo(
    () => getMarkdownComponents({ baseUrl: NOTES_BASE_URL }),
    []
  );

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
          className="h-[calc(100vh-56px)] overflow-y-auto bg-white"
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
