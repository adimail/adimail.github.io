import React from 'react';
import { Link } from '@tanstack/react-router';
import { HeroDistortion } from '../components/HeroDistortion';
import { Footer } from '../components/Footer';
import { getAllPosts, formatDate } from '../lib/posts';

export const Home: React.FC = () => {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-20 font-sans text-[15px] leading-relaxed text-zinc-900">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="flex flex-col md:col-span-7 space-y-14 md:space-y-20 min-w-0 w-full">
            <section>
              <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
                Hi, I am Aditya.
              </h1>
              <p className="text-zinc-600 mb-2">
                22-year-old Computer Science graduate &bull; Pune, India (IST / UTC+5:30)
              </p>
              <p className="text-zinc-800 mt-2">
                I like building fast, dependable software from first principles spanning Cloud infrastructure, distributed systems, real-time data pipelines, and responsive interfaces. I care deeply about good craft, clean abstractions, and software that feels great to use. Read my{' '}
                <Link to="/about">
                  Background, Stack &amp; Philosophy
                </Link>
                .
              </p>
              <p className="mt-4">
                <Link to="/img" className="text-zinc-500 text-sm">
                  Get a random image &rarr;
                </Link>
              </p>
            </section>

            <div className="md:hidden w-full flex flex-col items-start my-2">
              <div className="w-full max-w-full sm:max-w-[330px] aspect-square relative">
                <HeroDistortion />
              </div>
            </div>

            <section>
              <h2 className="font-serif italic text-2xl font-normal text-black mb-3 mt-20 md:mt-0">
                Experience <span className='text-sm'>(<a
                  href="mailto:aditya.godse747@gmail.com"
                >
                  Open to engineering roles &amp; contract work
                </a>)</span>
              </h2>
              <div className="space-y-2 text-zinc-800">
                <div className="flex items-baseline justify-between w-full">
                  <span className="shrink-0">
                    Chairperson @{' '}
                    <a
                      href="https://ioit.acm.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IOIT ACM
                    </a>
                  </span>
                  <span className="hidden md:block grow mx-2 border-b border-dotted border-zinc-400"></span>
                  <span className="shrink-0 text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
                    May 25 &ndash; May 26
                  </span>
                </div>
                <div className="flex items-baseline justify-between w-full">
                  <span className="shrink-0">
                    Webmaster @{' '}
                    <a
                      href="https://ioit.acm.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IOIT ACM
                    </a>
                  </span>
                  <span className="hidden md:block grow mx-2 border-b border-dotted border-zinc-400"></span>
                  <span className="shrink-0 text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
                    May 24 &ndash; May 25
                  </span>
                </div>
                <div className="flex items-baseline justify-between w-full">
                  <span className="shrink-0">
                    Founding Engineer @{' '}
                    <a
                      href="https://www.linkedin.com/company/hosteze"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Hosteze
                    </a>
                  </span>
                  <span className="hidden md:block grow mx-2 border-b border-dotted border-zinc-400"></span>
                  <span className="shrink-0 text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
                    Feb 24 &ndash; May 25
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif italic text-2xl font-normal text-black mb-3">
                Proof of Work
              </h2>
              <ul className="space-y-1.5 text-zinc-800">
                <li>
                  <Link to="/projects">
                    Serious projects
                  </Link>
                </li>
                <li>
                  <Link to="/funproj">
                    Fun projects
                  </Link>
                </li>
                <li>
                  <Link to="/hackthons">
                    Hackathons
                  </Link>
                </li>
                <li>
                  <Link to="/opensource">
                    Open source contributions
                  </Link>
                </li>
                <li>
                  <Link to="/papers">
                    Implemented research papers
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif italic text-2xl font-normal text-black mb-3">
                Featured Work
              </h2>
              <ul className="space-y-2 text-zinc-800">
                <li>
                  <a
                    href="https://adimail.github.io/movies/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    3D Spatial Film Database
                  </a>
                  <span className="text-zinc-500 text-xs block sm:inline sm:ml-2">
                    <span className='hidden md:inline-block'>&mdash;</span> Interactive multidimensional film explorer with WebGL
                  </span>
                </li>
                <li>
                  <a
                    href="https://github.com/adimail/rocket-landing-rl"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rocket Landing RL
                  </a>
                  <span className="text-zinc-500 text-xs block sm:inline sm:ml-2">
                    <span className='hidden md:inline-block'>&mdash;</span> Real-Time Fleet Telemetry for Deep RL Rocket Landing Simulation &amp; Visualization Platform
                  </span>
                </li>
                <li>
                  <a
                    href="https://github.com/adimail/Notebook-X"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Notebook-X
                  </a>
                  <span className="text-zinc-500 text-xs block sm:inline sm:ml-2">
                    <span className='hidden md:inline-block'>&mdash;</span> Zero-dependency interactive web Python notebook kernel
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif italic text-2xl font-normal text-black mb-3">
                Writings
              </h2>
              <div className="space-y-2 text-zinc-800">
                {recentPosts.map((post) => (
                  <div key={post.slug} className="flex items-baseline gap-3 min-w-0 w-full">
                    <span className="shrink-0 text-xs hidden md:block text-zinc-500 font-mono w-[84px]">
                      {formatDate(post.date)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      <Link
                        to="/writings/$slug"
                        params={{ slug: post.slug }}
                        title={post.title}
                        className="truncate !inline"
                      >
                        {post.title}
                      </Link>
                    </span>
                  </div>
                ))}
                <div className="pt-2">
                  <Link to="/writings" className="text-zinc-500 text-xs">
                    &rarr; View all essays and writings
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif italic text-2xl font-normal text-black mb-3">
                Elsewhere
              </h2>

              <div className='flex flex-wrap gap-4 text-sm'>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </a>
                <a
                  href="https://github.com/adimail"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/adimail2404"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://www.kaggle.com/decentralized"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kaggle
                </a>
                <a href="mailto:adimail2404@gmail.com">
                  Email
                </a>
              </div>
            </section>
          </div>

          <div className="hidden md:flex md:col-span-5 md:sticky md:top-16 flex-col items-center md:items-start">
            <div className="w-full max-w-[330px] aspect-square relative">
              <HeroDistortion />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
