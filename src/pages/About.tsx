import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { Bookshelf } from '../components/Bookshelf';

export const About: React.FC = () => {
  return (
    <Layout footer className="!max-w-none !px-0 !my-0">
      <div className="max-w-[1100px] mx-auto px-5 pt-[90px]">
        <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
          About <Link to="/">Aditya</Link>
        </h1>

        <p className="mt-3 text-zinc-700">
          I am a cloud and systems engineer focused on turning complex, ambiguous technical challenges into modular, performant, and well-documented software. My engineering philosophy centers on systems thinking, rapid prototyping, and end-to-end product engineering, with a strong emphasis on delivering interfaces with complex state, real-time interactions, and careful attention to performance and visual detail. Having co-founded platforms across both AI engineering and proptech, I specialize in bridging the gap between cutting-edge models and production-grade systems.
        </p>
        <p className="mt-3 text-zinc-700">
          My technical stack spans real-time data workflows, serverless cloud architectures, and autonomous agents. I build actively with languages around Python, TypeScript, Go, Java &amp; <a href='https://effectiveengineer.com/blog/master-adjacent-disciplines'>adjacent technologies</a>.
        </p>
        <p className="mt-3 text-zinc-700 font-serif">
		I enjoy the aesthetic of understanding technical things deeply enough to rebuild them.
        </p>

        <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />

        <ul className="list-disc pl-5 space-y-1.5 text-zinc-800">
          <li>Grew up chasing chickens in a small village.</li>
          <li>Now I like terminals, hot keys, and command-line tools.</li>
          <li>Deeply fascinated by space science, aerospace engineering and aviation.</li>
          <li>Had a great fondness for rockets and bicycles since a young age.</li>
          <li>Built and launched model rockets for fun as a kid.</li>
          <li>Fond of CAD, Electronics, Hardware and Industrial Design.</li>
          <li>I love computers.</li>
          <li>And I admire a good taste in movies and music.</li>
        </ul>

        <h2 className="font-serif italic text-2xl font-normal text-black mt-[60px] mb-3">
          On Engineering
        </h2>

        <p className="mt-2 text-zinc-800">
          Most engineers are seen as highly intelligent and start working with machines early in life. I didn't have an extraordinary start in engineering. I got into it because I wanted to use computers for games and movies. Over time, I learned to love them, discovering that computer science connects to many other fields.
        </p>

        <p className="mt-2 text-zinc-800">
          Engineering is a creative process that involves finding a balance between consuming knowledge and creating new things. Which I happen to understand is not easily teachable, and it's based on years of experience.
        </p>

        <p className="mt-2 text-zinc-800">
          Starting with a simple "hello world" level is better than trying to do everything at once. I focused on getting basic functionality working first.
        </p>

        <p className="mt-2 text-zinc-800">
          I value courage in engineering. It's the willingness to tackle difficult problems, walk into unfamiliar code, and search for answers. Courage is about shifting from "impossible" to "figureoutable."
        </p>

        <p className="mt-2 text-zinc-800">
          I love experimenting with things. Computers were part of my life since I could walk and I was sort of a computer geek in my school days but I was formally introduced to computer programming in my first year of college. C++ was my first language.
        </p>

        <p className="mt-2 text-zinc-800">
          If you see an opportunity for us to work together or have something you’d like to share, feel free to contact me at{' '}
          <a href="mailto:aditya.godse747@gmail.com">
            aditya.godse747@gmail.com
          </a>.
        </p>

        <img
          className="mt-[80px] w-auto max-md:w-full h-auto mx-auto block mb-[50px] max-h-[60vh] max-md:max-h-[80vh]"
          src="/assets/images/learning.jpeg"
          alt="Learning and notebook study reference"
        />

        <h2 className="font-serif italic text-2xl font-normal text-black mt-[60px] mb-3">
          Core Competencies
        </h2>

        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-zinc-800">
          <li>End-to-End Product Engineering</li>
          <li>Rapid Prototyping</li>
          <li>AI Agents &amp; LLM Integration</li>
          <li>Systems Thinking &amp; Architecture</li>
          <li>Technical Writing &amp; API Documentation</li>
          <li>Automated Testing &amp; QA</li>
          <li>Rapid Domain Adaptability</li>
          <li>Design Thinking</li>
          <li>Frontend and Interaction Design</li>
          <li>Developer Tooling &amp; Automation</li>
        </ul>

        <h2 className="font-serif italic text-2xl font-normal text-black mt-[60px] mb-0">
		<Link to="/reading">Reading</Link>
        </h2>
      </div>

      <Bookshelf />

      <div className="max-w-[1100px] mx-auto px-5 pb-[90px]">
        <h2 className="font-serif italic text-2xl font-normal text-black mt-[0px] mb-3">
          Tooling
        </h2>

        <p className="mt-2 text-zinc-800">
		I am a tools guy. I'm about getting things done quickly and having as little space between my thoughts and actions on the computer.
        </p>

        <p className="mt-2 text-zinc-800">
          I like having vim-like bindings and prefer running programs in the terminal for simplicity's sake. You can find my{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/adimail/dotfiles"
          >
            dotfiles
          </a>{' '}
          on GitHub.
        </p>

        <p className="mt-2 text-zinc-800">
          A non-exhaustive list of tools I use on a daily basis:
        </p>

        <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-800">
          <li>Neovim</li>
          <li>Lazygit</li>
          <li>tmux</li>
          <li>Zsh</li>
          <li>fzf</li>
          <li>FFmpeg</li>
          <li>Overleaf</li>
          <li>
            <a
              href="https://excalidraw.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Excalidraw
            </a>
          </li>
          <li>Google Sheets</li>
          <li>Google Docs</li>
          <li>
            <a
              href="https://cobalt.tools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cobalt
            </a>
          </li>
        </ul>

        <br />

        <img
          className="w-auto max-md:w-full h-auto mx-auto block mb-[50px] max-h-[60vh] max-md:max-h-[80vh] border border-zinc-200"
          src="https://raw.githubusercontent.com/adimail/dotfiles/refs/heads/main/assets/ss1.png"
          alt="Terminal setup screenshot 1"
        />

        <img
          className="w-auto max-md:w-full h-auto mx-auto block mb-[50px] max-h-[60vh] max-md:max-h-[80vh] border border-zinc-200"
          src="https://raw.githubusercontent.com/adimail/dotfiles/refs/heads/main/assets/ss2.png"
          alt="Terminal setup screenshot 2"
        />

        <img
          className="w-auto max-md:w-full h-auto mx-auto block mb-[50px] max-h-[60vh] max-md:max-h-[80vh] border border-zinc-200"
          src="https://raw.githubusercontent.com/adimail/dotfiles/refs/heads/main/assets/ss3.png"
          alt="Terminal setup screenshot 3"
        />

        <h2 className="font-serif italic text-2xl font-normal text-black mt-[60px] mb-3">
          Miscellaneous
        </h2>

        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-zinc-800">
          <li>
            Earned the LeetCode Knight badge, ranking among the <strong>top 5% globally</strong>.
          </li>
          <li>
            Among Top 15% in Kaggle <a href='https://www.kaggle.com/competitions/equity-post-HCT-survival-predictions' target='_blank'>CIBMTR &ndash; Equity in post-HCT Survival Predictions</a> competition (Rank 491/3278).
          </li>
          <li>
            Title Holder for Asia's Largest Painting on Recycled Paper Canvas (Aug. 2021).
          </li>
          <li>
            2-time National Level Rope Skipping Gold Medalist (Double unders &amp; Spot jump) (2016 &ndash; 2017).
          </li>
          <li>I lift weights and practice calisthenics.</li>
          <li>I like neckties and classic formal tailoring.</li>
        </ul>
      </div>
    </Layout>
  );
};
