import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';

export const RandomImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>('');

  const randomImageFiles = import.meta.glob('/public/assets/images/random/*.jpeg');
  const imageCount = Object.keys(randomImageFiles).length || 87;

  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;
    setImageSrc(`/assets/images/random/${randomIndex}.jpeg`);
  };

  useEffect(() => {
    generateRandomImage();
  }, []);

  return (
    <div className="m-0 flex justify-center items-center h-screen select-none">
      <main className="flex flex-col justify-center items-center">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Random photograph"
            className="w-full h-auto max-w-full max-h-[70vh] mb-5 border border-zinc-200"
          />
        )}
        <div className="grid gap-[10px] justify-items-center fixed bottom-5 left-1/2 -translate-x-1/2 m-auto">
          <button
            onClick={generateRandomImage}
            className="border border-zinc-900 px-3 py-1 bg-white text-sm hover:bg-zinc-100 cursor-pointer"
          >
            Get new image
          </button>
          <Link to="/" className="text-blue-700 text-xs">
            Return home
          </Link>
        </div>
      </main>
    </div>
  );
};

