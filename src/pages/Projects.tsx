import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { ProjectEntry } from '../components/ProjectEntry';

export const Projects: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Projects
      </h1>
      <p className="mt-2 text-zinc-700">
        A collection of engineering projects. You can also review my{' '}
        <Link to="/funproj">
          experimental and hobby projects
        </Link>
        .
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <ProjectEntry
          title="Bit-by-Mail: Bulk Email Automation Platform"
          link="https://pypi.org/project/bit-by-mail/"
          intro="Python, React, TypeScript, SQLite, WebSockets, CI/CD"
        >
          Bit-by-Mail is a local, privacy-focused bulk email tool that sends personalized emails and attachments through your own SMTP account. The platform is capable of processing 10,000+ emails per hour, published globally via PyPI. Architected a fault-tolerant SMTP dispatch engine streaming real-time campaign telemetry via full-duplex WebSockets with sub-50ms latency.
        </ProjectEntry>

        <ProjectEntry
          title="Real-Time Deep RL Rocket Landing & Telemetry Platform"
          link="https://github.com/adimail/rocket-landing-rl"
          intro="Python, Reinforcement Learning, PyTorch, WebSockets"
        >
          Developed a real-time fleet telemetry and deep RL environment for automated rocket soft-landings, accelerating training convergence by over 2x using dynamic reward shaping. Optimized WebSocket throughput via a custom binary payload encoder, cutting network bandwidth to 1.9 KB per tick for 300 concurrent rockets.
        </ProjectEntry>
	  <ProjectEntry
		title="Narrative Designer: Temporal Node IDE for Game Narratives"
		link="https://adimail.github.io/narrativedesigner/"
		intro="TypeScript, React, Tailwind CSS, Playwright, Vite"
	  >
		Specialized IDE for game narrative design engineered to visualize and edit branching narrative structures across a strict temporal grid (28 Days &times; 4 Time Slots). Dictates game scenarios, metadata, and directional flowlines while enforcing temporal guardrails to prevent paradoxes and ensure engine data integrity.
	  </ProjectEntry>

	  <ProjectEntry
		title="Zip Courtroom"
		link="https://zip-courtroom-dragonwarrior.vercel.app/"
		intro="Next.js, TypeScript, Google Sheets API, Tailwind CSS"
	  >
		An over-engineered courtroom dashboard and game engine tracking high-stakes competitive match statistics for the LinkedIn Zip puzzle. Implements a client-side playable game clone, a custom Hamiltonian path puzzle generator and solver, automated daily verdicts, and real-time Google Sheets API telemetry.
	  </ProjectEntry>

        <ProjectEntry
          title="Telecom Network Data Pipeline (tndp)"
          link="https://github.com/adimail/tndp"
          intro="Go, ELK Stack, Docker, Syslog, SNMP, Filebeat, Metricbeat"
        >
          Engineered an end-to-end telemetry pipeline in Go to simulate, ingest, and process high-throughput network metrics (Syslog, SNMP traps, PM CSVs) into an ELK Stack. Configured automated parsing, enrichment, and visualization workflows using Logstash to generate real-time Kibana dashboards for network health monitoring.
        </ProjectEntry>

        <ProjectEntry
          title="Interactive 3D Spatial Film Database"
          link="https://adimail.github.io/movies/"
          intro="TypeScript, React, Three.js (WebGL), Zustand, CI/CD"
        >
          Designed an interactive 3D spatial visualization engine using React-Three-Fiber and WebGL to navigate multi-dimensional movie datasets in a dynamic 3D space. Architected a mathematical pipeline projecting 12D data into 3D Cartesian space, featuring dynamic frustum culling and camera-driven recommendations.
        </ProjectEntry>

        <ProjectEntry
          title="Notebook-X | Lightweight Interactive Python Notebook"
          link="https://github.com/adimail/Notebook-X"
          intro="March 2025 | Python, TypeScript, Tornado, ZeroMQ, WebSockets, IPython"
        >
          A lightweight web notebook environment developed from scratch without relying on jupyter_server or jupyter_client. It implements file browsing, stateful kernel execution, and rendering of rich output types including images and HTML. Inter-process communication between the web server and Python execution kernels is handled via ZeroMQ sockets and WebSockets.
        </ProjectEntry>

        <ProjectEntry
          title="Prompt Builder & Experimentation Workbench"
          link="https://github.com/adimail/prompt-builder"
          intro="TypeScript, React, Local Storage"
        >
          Built a zero-backend, local-first workbench in TypeScript to author, test, and iterate on complex LLM prompt templates directly in browser runtime. Designed modular state management and context assembly tooling to evaluate variable substitution and prompt structures with zero execution latency.
        </ProjectEntry>

        <ProjectEntry
          title="Fun with Flags: Real-Time Multiplayer Engine"
          link="https://github.com/adimail/fun-with-flags"
          intro="Go, WebSockets (Gorilla), JavaScript, HTML/CSS"
        >
          Real-time multiplayer flag-guessing game featuring flag-to-country and interactive map challenge modes built on Go and Gorilla WebSockets. Implemented full-duplex WebSocket communication over secure channels (wss://) with state synchronization for low-latency concurrent client sessions.
        </ProjectEntry>

        <ProjectEntry
          title="Bulls & Cows Colosseum"
          link="https://github.com/adimail/bulls-and-cows"
          intro="Go, TypeScript, Docker, Google Sheets API"
        >
          A real-time multiplayer implementation of the classic Bulls and Cows game packaged into a containerized Go and TypeScript architecture. Integrated dynamic game history tracking by piping match stats and telemetry directly into the Google Sheets API via service account authentication.
        </ProjectEntry>

        <ProjectEntry
          title="Wildlife Rescue Operations Platform (manwithindies)"
          link="https://github.com/adimail/manwithindies"
          intro="TypeScript, React, Tailwind CSS"
        >
          Specialized web application for wildlife rescue organizations to log, process, and map real-time field data and release operations. Formulated structured forms, location mapping, and data validation pipelines to streamline volunteer submission workflows during field rescues.
        </ProjectEntry>

        <ProjectEntry
          title="Mermaid-Editor: AI Diagram & Markdown Studio"
          link="https://github.com/adimail/mermaid-editor"
          intro="TypeScript, JavaScript, Gemini LLM, Mermaid.js, Vercel"
        >
		Mermaid Mind is a powerful, web-based MermaidJS editor enhanced with AI capabilities powered by Google Gemini and Monaco Editor. Whether you’re sketching flowcharts, sequence diagrams, Gantt charts, ER diagrams, class diagrams, pie charts or more, Mermaid Mind makes diagram creation fast, intuitive, and shareable.
        </ProjectEntry>

        <ProjectEntry
          title="Quick-Flask | Project Scaffolding CLI"
          link="https://adimail.github.io/quickflask/"
          intro="January 2025 | Python, CLI, Pip"
        >
          A command-line generator that scaffolds standardized, production-ready Flask project layouts. It automates directory creation, blueprints, configuration files, and static asset handling, enabling engineers to jump straight into feature implementation.
        </ProjectEntry>

        <ProjectEntry
          title="IOIT ACM Student Chapter Portal"
          link="https://ioit.acm.org/"
          intro="November 2024 | Flask, Tailwind CSS, Three.js, WebGL, HTMX"
        >
          The official web platform for the IOIT ACM Student Chapter. Built on Flask and styled with Tailwind CSS, it features interactive WebGL components alongside HTMX-driven dynamic updates. Includes rate-limiting controls and infrastructure hardening against malicious traffic.
        </ProjectEntry>

        <ProjectEntry
          title="IOIT TENET"
          link="https://ioittenet.com/"
          intro="October 2024 | TypeScript, GSAP, Three.js, WebGL, Tailwind CSS"
        >
          The flagship annual event platform for TENET 2024. Designed with interactive 3D elements and GSAP transitions, the application supported registration workflows for over 15,000 visitors during its primary three-week campaign.
        </ProjectEntry>

        <ProjectEntry
          title="Mermaid Mind"
          link="https://mermaid-mind.vercel.app/"
          intro="August 2024 | Next.js, Mermaid.js, Gemini API, MongoDB"
        >
          An AI-powered diagram generation tool. Users can describe workflows or architectures in natural language, which the system converts into rendered Mermaid.js diagrams with real-time export and persistence options.
        </ProjectEntry>

        <ProjectEntry
          title="Telegram ETL Scraper"
          link="https://github.com/adimail/telegram-scrapper"
          intro="May 2023 | Python, Data Pipelines"
        >
          An automated extraction script that ingests channel messages from Telegram and formats the structured output into sanitized CSV files for analytical ingestion.
        </ProjectEntry>

        <ProjectEntry
          title="Moneyball"
          link="https://github.com/adimail/moneyball-native"
          intro="January 2024 | React Native, Firebase"
        >
          A cross-platform financial tracking application providing automated ledger aggregation and categorization backed by Firebase synchronization.
        </ProjectEntry>
      </section>
    </Layout>
  );
};
