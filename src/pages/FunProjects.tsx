import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { ProjectEntry } from '../components/ProjectEntry';

export const FunProjects: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Fun Projects
      </h1>
      <p className="mt-2 text-zinc-700">
        You can inspect my primary engineering work on the{' '}
        <Link to="/projects">
          projects page
        </Link>
        .
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <ProjectEntry
          title="MLOps & Deep Learning Portfolio"
          link="https://adimail.github.io/mlops/"
          intro="January 2025 | TensorFlow.js, Machine Learning, Web Deployment"
        >
          A curated collection of machine learning and deep learning implementations converted for client-side execution via TensorFlow.js. Includes interactive web demonstrations along with links to training notebooks and source repositories.
        </ProjectEntry>

        <ProjectEntry
          title="Visual Data Structures"
          link="https://adimail.github.io/visual-data-structures/"
          intro="November 2023 | React, Tailwind CSS, TypeScript"
        >
          An educational simulator designed to animate fundamental computer science structures and algorithms, including pointer traversals, stack operations, and comparison-based sorting routines.
        </ProjectEntry>

        <ProjectEntry
          title="LazyFFMPEG"
          link="https://gist.github.com/adimail/4a22b63faaf379fd72eeaae805b1c7c7"
          intro="March 2024 | Shell, FFmpeg, fzf"
        >
          FFmpeg is extremely powerful for audio and video manipulation, but its syntax can be challenging to memorize. LazyFFMPEG couples fzf with FFmpeg into an interactive shell script, enabling users to execute transcoding, clipping, and extraction workflows without manual flag configuration.
        </ProjectEntry>

        <ProjectEntry
          title="Machine Learning from Scratch (NumPy Only)"
          link="https://github.com/adimail/barebones-ml"
          intro="March 2025 | Machine Learning, NumPy"
        >
          First-principles implementations of core machine learning algorithms written exclusively in Python using NumPy. The repository explores gradient descent, neural network layers, and activation functions without relying on modern autodiff frameworks.
        </ProjectEntry>

        <ProjectEntry
          title="PDFTools"
          link="https://github.com/adimail/pdftools"
          intro="December 2024 | Python, Automation"
        >
          A suite of lightweight Python scripts designed to automate common document formatting tasks locally, such as grayscale conversion and color inversion for print optimization, without uploading sensitive files to third-party web services.
        </ProjectEntry>

        <ProjectEntry
          title="Web Minifier"
          link="https://github.com/adimail/web-minifier"
          intro="December 2024 | Perl"
        >
          A Perl utility that minifies JavaScript and CSS assets by stripping comments and extraneous whitespace. It can be run as a one-time build step or in continuous file-watch mode.
        </ProjectEntry>

        <ProjectEntry
          title="Sisyphus"
          link="https://github.com/adimail/sisypus"
          intro="November 2024 | Go, Terminal UI"
        >
          A minimalist task manager built in Go for the terminal using the gocui library, providing clean keyboard shortcuts for task tracking directly from the shell.
        </ProjectEntry>

        <ProjectEntry
          title="DNS Resolver"
          link="https://github.com/adimail/dns-resolver"
          intro="October 2024 | Go, Networking"
        >
          A recursive DNS resolver written in Go to study low-level networking protocols. It parses DNS packet structures, manages local cache entries, and queries upstream name servers for record resolution.
        </ProjectEntry>

        <ProjectEntry
          title="Heads Up ACM"
          link="https://github.com/adimail/headsup"
          intro="September 2024 | Flutter, Mobile"
        >
          A party game built in Flutter utilizing mobile accelerometer sensors to determine card rotation during timed group guessing rounds.
        </ProjectEntry>

        <ProjectEntry
          title="Classroom"
          link="https://adimail.github.io/classroom/"
          intro="June 2024 | Jekyll, Technical Writing"
        >
          A personal repository of structured study guides and references maintained for collaborative peer learning.
        </ProjectEntry>

        <ProjectEntry
          title="GPT-CI Chrome Extension"
          link="https://github.com/adimail/gpt-ci"
          intro="January 2024 | Webpack, Browser Extension"
        >
          A browser extension designed to store, manage, and inject modular custom instructions into web chat interfaces.
        </ProjectEntry>
      </section>
      
    </Layout>
  );
};
