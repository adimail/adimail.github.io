import React from 'react';
import type { Components } from 'react-markdown';
import { FileText, Download, ExternalLink, Music } from 'lucide-react';
import { MediaViewer } from './MediaViewer';
import { detectMediaType } from '../lib/media';

interface MarkdownConfig {
  baseUrl?: string;
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

export const getMarkdownComponents = (config: MarkdownConfig = {}): Components => {
  const cleanBase = config.baseUrl ? config.baseUrl.replace(/\/+$/, '') : '';

  const resolveUrl = (url: string) => {
    const raw = (url || '').trim();
    if (!raw) return '';
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }
    if (!cleanBase) {
      return raw;
    }
    if (raw.startsWith('/')) {
      return `${cleanBase}${raw}`;
    }
    return `${cleanBase}/${raw}`;
  };

  const getHeadingId = (children: React.ReactNode) => {
    const text = extractText(children);
    return slugify(text) || 'heading';
  };

  return {
    h1: ({ children, node, ...props }) => {
      const id = getHeadingId(children);
      return (
        <h1
          id={id}
          className="font-serif italic text-2xl sm:text-3xl font-normal text-black mt-10 mb-4 leading-tight tracking-normal scroll-mt-24"
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, node, ...props }) => {
      const id = getHeadingId(children);
      return (
        <h2
          id={id}
          className="font-serif italic text-xl sm:text-2xl font-normal text-black mt-8 mb-3 leading-snug tracking-normal scroll-mt-24"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, node, ...props }) => {
      const id = getHeadingId(children);
      return (
        <h3
          id={id}
          className="font-sans font-bold text-base sm:text-lg text-black mt-6 mb-2 leading-snug scroll-mt-24"
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4: ({ children, node, ...props }) => (
      <h4
        className="font-sans font-semibold text-sm sm:text-base text-zinc-900 mt-5 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, node, ...props }) => (
      <p className="text-[15px] text-zinc-800 leading-relaxed mb-5" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-black" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-zinc-900" {...props}>
        {children}
      </em>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-5 space-y-1.5 text-zinc-800 my-4 text-[15px]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-5 space-y-1.5 text-zinc-800 my-4 text-[15px]" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, node, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, node, ...props }) => (
      <blockquote
        className="border-l-2 border-zinc-900 pl-4 my-6 italic text-zinc-700 text-[15px]"
        {...props}
      >
        {children}
      </blockquote>
    ),
    a: ({ href, children, ...props }) => {
      const rawHref = href || '';
      const resolvedHref = resolveUrl(rawHref);
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
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 !text-zinc-800 ![background-image:none] ![-webkit-text-fill-color:initial] before:!hidden flex items-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>View PDF</span>
              </a>
              <a
                href={resolvedHref}
                download
                className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 !text-zinc-600 ![background-image:none] ![-webkit-text-fill-color:initial] before:!hidden"
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
          <MediaViewer
            src={resolvedHref}
            alt={typeof children === 'string' ? children : ''}
          />
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
          rel={resolvedHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => {
      const rawSrc = src || '';
      const resolvedSrc = resolveUrl(rawSrc);
      const type = detectMediaType(rawSrc);

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
                className="px-2.5 py-1 text-[11px] font-mono font-bold bg-white border border-zinc-200 rounded !text-zinc-700 hover:!text-black ![background-image:none] ![-webkit-text-fill-color:initial] before:!hidden flex items-center gap-1"
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

      return <MediaViewer src={resolvedSrc} alt={alt || ''} />;
    },
    pre: ({ children, node, ...props }) => (
      <pre
        className="bg-zinc-100 border border-zinc-200 p-4 overflow-x-auto text-xs font-mono text-zinc-900 my-6 leading-normal rounded-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ className, children, ...props }: any) => {
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
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table
          className="w-full border-collapse border border-zinc-200 text-xs text-left"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead
        className="bg-zinc-50 border-b border-zinc-200 text-zinc-900 font-semibold"
        {...props}
      >
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="p-2.5 font-semibold text-zinc-900 border border-zinc-200"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="p-2.5 text-zinc-700 border border-zinc-200" {...props}>
        {children}
      </td>
    ),
    hr: ({ ...props }) => (
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
  };
};
