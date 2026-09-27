import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { ProjectEntry } from '../components/ProjectEntry';

export const Hackathons: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Hackathon Projects
      </h1>
      <p className="mt-2 text-zinc-700">
        Explore my complete collection of{' '}
        <Link to="/projects">
          projects
        </Link>{' '}
        and{' '}
        <Link to="/papers">
          implemented papers
        </Link>
        .
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <ProjectEntry
          title="Stryde: Gamified Onchain Fitness Platform"
          link="https://github.com/adimail/stryde"
          intro="ETHOnline 2026 | React Native (Expo), TypeScript, Solidity, Privy, World ID, The Graph"
        >
          Built a mobile fitness platform for ETHOnline 2026 capturing real-world territory onchain via GPS route telemetry, IPFS metadata, and Solidity smart contracts on Sepolia. Integrated World ID Selfie Check for sybil-resistant leaderboards, Privy for embedded wallet auth, and indexed 9 custom smart contract registries using The Graph.
        </ProjectEntry>

        <ProjectEntry
          title="SpellCraft: Autonomous Minecraft AI Mod"
          link="https://github.com/adimail/spellcraft"
          intro="HackByte 4.0 | Java, Fabric Loom, Gemini API, Ollama, Python"
        >
          Developed an agentic Minecraft mod for HackByte 4.0 enabling autonomous in-game execution from natural language commands via structured JSON plans from Gemini and local Ollama models. Implemented long-term goal planning with multi-step auto-execution, spatial memory tracking, and automated survival reflexes running on server ticks.
        </ProjectEntry>

        <ProjectEntry
          title="Pickled Plums: Edge Telemetry Framework"
          link="https://github.com/adimail/pickled-plums"
          intro="HackByte 3.0 | Go, Python, Docker, Edge Computing, MongoDB, Prometheus, Grafana"
        >
          Developed during the HackByte 3.0 MLH hackathon in Jabalpur. Built as a high-throughput, lightweight, self-hosted alternative to expensive cloud IoT services, processing 140 KB/s sensor throughput and demonstrating a greater than 10x cost reduction over Azure IoT Hub. Combines a custom Go sensor simulation server and configurable orchestration engine streaming telemetry data to structured time-series storage.
        </ProjectEntry>

        <ProjectEntry
          title="Metastore Viewer for Lakehouse Tables on Object Storage"
          link="https://github.com/adimail/metastore-viewer"
          intro="March 2025 | Apache Iceberg, Apache Hudi, Trino, Python, Flask"
        >
          A metadata inspection and visualization tool for data lakehouse architectures. It enables teams to inspect schema evolution, monitor partition manifests, and analyze metadata structures directly on object storage without requiring an external catalog service.
        </ProjectEntry>

        <ProjectEntry
          title="FIFS Sports Data Gameathon 2025 | Fantasy Roster Optimization"
          link="https://github.com/adimail/fantasy-sports-machine-learning"
          intro="February 2025 | Linear Programming, PuLP, XGBoost, Scikit-Learn"
        >
          An algorithmic optimization system designed to select optimal fantasy sport lineups. Player projections were generated using XGBoost regression models, after which a multi-objective linear programming solver (PuLP) maximized expected point output subject to strict roster and salary cap constraints.
        </ProjectEntry>

        <ProjectEntry
          title="Aryabhatta-Search | Educational Synthesis Engine"
          link="https://adimail.github.io/aryabhatta-search/"
          intro="February 2025 | Next.js, TypeScript, Supabase, Google Cloud, TF-IDF"
        >
          An educational search application designed to synthesize complex technical queries into curated, age-appropriate explanations. The engine leverages custom recommendation ranking built with TF-IDF vectors to suggest complementary reading materials.
        </ProjectEntry>

        <ProjectEntry
          title="AISpire UP Hackathon | Real-Time Video Anomaly Detection"
          link="https://adimail.github.io/cctv-surveillance/"
          intro="January 2025 | Flask, TensorFlow, Computer Vision, Real-Time Analytics"
        >
          A computer vision surveillance prototype utilizing deep learning attention layers to detect physical altercations in CCTV video feeds in real time. Features include automated anomaly alerts, historical incident logging, and administrative analytics dashboards.
        </ProjectEntry>
      </section>
      
    </Layout>
  );
};
