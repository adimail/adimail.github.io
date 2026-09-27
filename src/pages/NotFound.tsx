import React, { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';

export const NotFound: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const routerState = useRouterState();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : routerState.location.href;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 7) + 1;
    setImageSrc(`/assets/404/${randomIndex}.jpg`);
  }, []);

  return (
    <main className="flex m-auto text-center justify-center items-center min-h-screen px-5">
      <div className="leading-relaxed">
        <h1 className="font-serif italic text-3xl font-normal text-black mb-2">
          Page Not Found
        </h1>
        <p className="text-zinc-600 mb-4">
          The requested URL could not be resolved: <br />
          <span className="text-red-600 font-mono text-xs break-all">
            {currentUrl}
          </span>
        </p>
        <p className="mb-6">
          <Link to="/">
            &larr; Return to Homepage
          </Link>
        </p>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Not found illustration"
            className="h-[300px] mx-auto block border border-zinc-200"
          />
        )}
      </div>
    </main>
  );
};

