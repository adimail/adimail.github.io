import React from 'react';
import { Link } from '@tanstack/react-router';

export const HeroImage: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start md:items-center">
      <img
        src="/adimail.jpeg"
        alt="Aditya"
        className="w-full aspect-square object-cover block"
      />
      <div className="w-full max-w-[330px] mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-zinc-600 relative z-10">
        <Link to="/work">
          Work
        </Link>
        <Link to="/projects">
          Projects
        </Link>
        <Link to="/hackthons">
          Hackathons
        </Link>
        <Link to="/writings">
          Writings
        </Link>
        <Link to="/reading">
          Reading
        </Link>
        <Link to="/notes.md">
          Notes
        </Link>
        <a
          href="https://adimail.github.io/movies/"
          target="_blank"
          rel="noreferrer"
        >
          Movies
        </a>
        <Link to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

