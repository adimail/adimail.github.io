import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { ProjectEntry } from '../components/ProjectEntry';

export const Papers: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Implemented Papers
      </h1>
      <p className="mt-2 text-zinc-700">
        Explore my complete list of{' '}
        <Link to="/projects">
          projects
        </Link>{' '}
        and{' '}
        <Link to="/hackthons">
          hackathon entries
        </Link>
        .
      </p>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <ProjectEntry
          title="Vision-Based Fight Detection from Surveillance Cameras"
          link="https://github.com/adimail/ml-papers/blob/master/fight-detection/bi_LSTM_fight_detection.ipynb"
          intro="February 2025 | CNN, Bi-LSTM, Self-Attention, Computer Vision"
        >
          Re-implemented research on violent altercation detection in surveillance footage. The architecture integrates an Xception backbone for spatial feature extraction coupled with a Bidirectional LSTM and attention mechanism to capture temporal dynamics across consecutive frames. The model reproduces the performance described in the original paper, including OpenCV visualization routines for inference playback.
        </ProjectEntry>
      </section>

      
    </Layout>
  );
};
