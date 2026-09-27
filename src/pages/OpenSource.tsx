import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';

export const OpenSource: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Open Source Contributions
      </h1>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">OpenSSL</h2>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Implemented a new <code>-cipher</code> command-line option in OpenSSL’s <code>req</code> utility, enabling users to specify modern symmetric encryption algorithms for private keys rather than relying on legacy defaults.{' '}
                <a
                  href="https://github.com/openssl/openssl/pull/25796"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pull Request #25796
                </a>
              </li>
              <li>
                Updated default cipher selections across the <code>req</code>, <code>cms</code>, and <code>smime</code> applications, while synchronizing corresponding man pages and usage documentation to meet OpenSSL code standards.{' '}
                <a
                  href="https://github.com/openssl/openssl/pull/25839"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pull Request #25839
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">nvim-tree</h2>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Proposed dedicated iconography and visual distinction for Git submodules within the nvim-tree file explorer to improve repository navigation clarity.{' '}
                <a
                  href="https://github.com/nvim-tree/nvim-tree.lua/issues/3038"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issue #3038
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <p className="mt-[50px] text-zinc-700">
        Review my complete contribution history on{' '}
        <a
          href="https://github.com/adimail"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </Layout>
  );
};
