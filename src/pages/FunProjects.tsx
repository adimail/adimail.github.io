import React from "react";
import { Link } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { ProjectEntry } from "../components/ProjectEntry";

export const FunProjects: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Fun Projects
      </h1>
      <p className="mt-2 text-zinc-700">
        You can check my primary engineering work on the{" "}
        <Link to="/projects">projects page</Link>.
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <ProjectEntry
          title="Zip Courtroom"
          link="https://zip-courtroom-dragonwarrior.vercel.app/"
          intro="Next.js, TypeScript, Google Sheets API, Tailwind CSS"
        >
          An over-engineered courtroom dashboard and game engine tracking
          high-stakes competitive match statistics for the LinkedIn Zip puzzle.
          Implements a client-side playable game clone, a custom Hamiltonian
          path puzzle generator and solver, automated daily verdicts, and
          real-time Google Sheets API telemetry.
        </ProjectEntry>

        <ProjectEntry
          title="MLOps & Deep Learning Portfolio"
          link="https://adimail.github.io/mlops/"
          intro="January 2025 | TensorFlow.js, Machine Learning, Web Deployment"
        >
          A curated collection of machine learning and deep learning
          implementations converted for client-side execution via TensorFlow.js.
          Includes interactive web demonstrations along with links to training
          notebooks and source repositories.
        </ProjectEntry>

        <ProjectEntry
          title="Prompt Builder & Experimentation Workbench"
          link="https://github.com/adimail/prompt-builder"
          intro="TypeScript, React, Local Storage"
        >
          Built a zero-backend, local-first workbench in TypeScript to author,
          test, and iterate on complex LLM prompt templates directly in browser
          runtime. Designed modular state management and context assembly
          tooling to evaluate variable substitution and prompt structures with
          zero execution latency.
        </ProjectEntry>

        <ProjectEntry
          title="Visual Data Structures"
          link="https://adimail.github.io/visual-data-structures/"
          intro="November 2023 | React, Tailwind CSS, TypeScript"
        >
          An educational simulator designed to animate fundamental computer
          science structures and algorithms, including pointer traversals, stack
          operations, and comparison-based sorting routines.
        </ProjectEntry>

        <ProjectEntry
          title="Bulls & Cows Colosseum"
          link="https://github.com/adimail/bulls-and-cows"
          intro="Go, TypeScript, Docker, Google Sheets API"
        >
          A real-time multiplayer implementation of the classic Bulls and Cows
          game packaged into a containerized Go and TypeScript architecture.
          Integrated dynamic game history tracking by piping match stats and
          telemetry directly into the Google Sheets API via service account
          authentication.
        </ProjectEntry>

        <ProjectEntry
          title="Wildlife Rescue Operations Platform (manwithindies)"
          link="https://github.com/adimail/manwithindies"
          intro="TypeScript, React, Tailwind CSS"
        >
          Specialized web application for wildlife rescue organizations to log,
          process, and map real-time field data and release operations.
          Formulated structured forms, location mapping, and data validation
          pipelines to streamline volunteer submission workflows during field
          rescues.
        </ProjectEntry>

        <ProjectEntry
          title="Mermaid-Editor: AI Diagram & Markdown Studio"
          link="https://github.com/adimail/mermaid-editor"
          intro="TypeScript, JavaScript, Gemini LLM, Mermaid.js, Vercel"
        >
          Mermaid Mind is a powerful, web-based MermaidJS editor enhanced with
          AI capabilities powered by Google Gemini and Monaco Editor. Whether
          you’re sketching flowcharts, sequence diagrams, Gantt charts, ER
          diagrams, class diagrams, pie charts or more, Mermaid Mind makes
          diagram creation fast, intuitive, and shareable.
        </ProjectEntry>

        <ProjectEntry
          title="Quick-Flask | Project Scaffolding CLI"
          link="https://adimail.github.io/quickflask/"
          intro="January 2025 | Python, CLI, Pip"
        >
          A command-line generator that scaffolds standardized, production-ready
          Flask project layouts. It automates directory creation, blueprints,
          configuration files, and static asset handling, enabling engineers to
          jump straight into feature implementation.
        </ProjectEntry>

        <ProjectEntry
          title="LazyFFMPEG"
          link="https://gist.github.com/adimail/4a22b63faaf379fd72eeaae805b1c7c7"
          intro="March 2024 | Shell, FFmpeg, fzf"
        >
          FFmpeg is extremely powerful for audio and video manipulation, but its
          syntax can be challenging to memorize. LazyFFMPEG couples fzf with
          FFmpeg into an interactive shell script, enabling users to execute
          transcoding, clipping, and extraction workflows without manual flag
          configuration.
        </ProjectEntry>

        <ProjectEntry
          title="Machine Learning from Scratch (NumPy Only)"
          link="https://github.com/adimail/barebones-ml"
          intro="March 2025 | Machine Learning, NumPy"
        >
          First-principles implementations of core machine learning algorithms
          written exclusively in Python using NumPy. The repository explores
          gradient descent, neural network layers, and activation functions
          without relying on modern autodiff frameworks.
        </ProjectEntry>

        <ProjectEntry
          title="PDFTools"
          link="https://github.com/adimail/pdftools"
          intro="December 2024 | Python, Automation"
        >
          A suite of lightweight Python scripts designed to automate common
          document formatting tasks locally, such as grayscale conversion and
          color inversion for print optimization, without uploading sensitive
          files to third-party web services.
        </ProjectEntry>

        <ProjectEntry
          title="Web Minifier"
          link="https://github.com/adimail/web-minifier"
          intro="December 2024 | Perl"
        >
          A Perl utility that minifies JavaScript and CSS assets by stripping
          comments and extraneous whitespace. It can be run as a one-time build
          step or in continuous file-watch mode.
        </ProjectEntry>

        <ProjectEntry
          title="Sisyphus"
          link="https://github.com/adimail/sisypus"
          intro="November 2024 | Go, Terminal UI"
        >
          A minimalist task manager built in Go for the terminal using the gocui
          library, providing clean keyboard shortcuts for task tracking directly
          from the shell.
        </ProjectEntry>

        <ProjectEntry
          title="DNS Resolver"
          link="https://github.com/adimail/dns-resolver"
          intro="October 2024 | Go, Networking"
        >
          A recursive DNS resolver written in Go to study low-level networking
          protocols. It parses DNS packet structures, manages local cache
          entries, and queries upstream name servers for record resolution.
        </ProjectEntry>

        <ProjectEntry
          title="Heads Up ACM"
          link="https://github.com/adimail/headsup"
          intro="September 2024 | Flutter, Mobile"
        >
          A party game built in Flutter utilizing mobile accelerometer sensors
          to determine card rotation during timed group guessing rounds.
        </ProjectEntry>

        <ProjectEntry
          title="Classroom"
          link="https://adimail.github.io/classroom/"
          intro="June 2024 | Jekyll, Technical Writing"
        >
          A personal repository of structured study guides and references
          maintained for collaborative peer learning.
        </ProjectEntry>

        <ProjectEntry
          title="GPT-CI Chrome Extension"
          link="https://github.com/adimail/gpt-ci"
          intro="January 2024 | Webpack, Browser Extension"
        >
          A browser extension designed to store, manage, and inject modular
          custom instructions into web chat interfaces.
        </ProjectEntry>
      </section>
    </Layout>
  );
};
