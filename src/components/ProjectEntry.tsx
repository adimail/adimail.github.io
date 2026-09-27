import React from 'react';

interface ProjectEntryProps {
  title: string;
  link: string;
  intro: string;
  children: React.ReactNode;
}

export const ProjectEntry: React.FC<ProjectEntryProps> = ({
  title,
  link,
  intro,
  children,
}) => {
  return (
    <div className="mb-12 pb-4 max-w-full">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-zinc-900 block mb-2 w-fit"
      >
        {title}
      </a>
      <p className="text-xs text-zinc-500 bg-zinc-100 w-fit px-2 py-1 rounded mb-2">
        {intro}
      </p>
      <div className="text-zinc-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};
