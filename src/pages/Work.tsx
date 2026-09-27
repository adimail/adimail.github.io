import React from 'react';
import { Link } from '@tanstack/react-router';
import { Layout } from '../components/Layout';

export const Work: React.FC = () => {
  return (
    <Layout footer>
      <h1 className="font-serif italic text-3xl font-normal text-black mb-3">
        <Link to="/">Aditya's</Link> Work Experience
      </h1>
      <hr className="h-[1px] w-full bg-zinc-200 p-0 m-0 border-0 my-5" />
      <section className="mt-[40px]">
        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">
            AISSMS IOIT ACM Student Chapter &mdash; Chairperson
          </h2>
          <p className="text-xs text-zinc-500 bg-zinc-100 w-fit px-2 py-1 rounded my-2">
            May 2025 &ndash; May 2026
          </p>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Led a 100+ member community and cross-functional teams across engineering, design, operations, and outreach.
              </li>
              <li>
                Led a national-level hackathon, CTF, MUN Conference, Youth Parliament and pro bono technical community work, managing teams, timelines, logistics, and technical infrastructure.
              </li>
              <li>
                Built flagship competition platforms including{' '}
                <a
                  href="https://github.com/renarin-kholin/bit-by-design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bit by Design
                </a>
                ,{' '}
                <a
                  href="https://github.com/swarooppatilx/bit-by-query"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bit by Query
                </a>
                , and{' '}
                <a
                  href="https://github.com/swarooppatilx/bit-by-keystroke"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bit by Keystroke
                </a>{' '}
                using Rust, TypeScript, and Node.js.
              </li>
              <li>
                Developed digital platforms and websites for major events including{' '}
                <a
                  href="https://yp.ioit.acm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IOIT Youth Parliament
                </a>
                ,{' '}
                <a
                  href="https://ioittenet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IOIT Tenet
                </a>
                , and{' '}
                <a
                  href="https://mun.ioittenet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IOIT Model United Nations
                </a>
                .
              </li>
              <li>
                Built{' '}
                <a
                  href="https://os.ioit.acm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chapter OS
                </a>
                , a centralized platform for chapter recruitment, events, documentation, calendar, and planning.
              </li>
              <li>
                Built internal tools for attendance, ID-card generation, CRM, CMS, and link management, reducing operational overhead.
              </li>
              <li>
                Developed{' '}
                <a
                  href="https://pypi.org/project/bit-by-mail/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bit by Mail
                </a>
                , a self-hosted bulk mailing platform published as an open-source PyPI package.
              </li>
              <li>
                Established the chapter's design system, Figma documentation, media toolkit, and LaTeX templates for developer, financial and chapter reports.
              </li>
              <li>
                Introduced Rust and Go for performance-critical services, with a focus on scalability, accessibility, and performance.
              </li>
              <li>
                Our team earned the ACM India Outstanding Chapter Award 2025&ndash;26 for its contributions and impact.
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">
            AISSMS IOIT ACM Student Chapter &mdash; Webmaster
          </h2>
          <p className="text-xs text-zinc-500 bg-zinc-100 w-fit px-2 py-1 rounded my-2">
            May 2024 &ndash; May 2025
          </p>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Set up and managed cPanel, web infrastructure, hosting, and production operations for the chapter.
              </li>
              <li>
                Built CI/CD pipelines for automated development, testing, and deployments.
              </li>
              <li>
                Introduced test automation and quality metrics into development workflows for the team.
              </li>
              <li>
                Established Agile development practices across the web team.
              </li>
              <li>
                Standardized development and deployment workflows for contributors.
              </li>
              <li>
                Open-sourced the chapter's web development and internal tooling.
              </li>
              <li>
                Managed production deployments and web operations for chapter activities.
              </li>
              <li>
                Conducted ACM workshops on Web3, Cloud Engineering, and Web Development for 1000+ Students.
              </li>
              <li>
                Mentored students through hands-on development and engineering projects.
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">
            Hosteze &mdash; Co-founder
          </h2>
          <p className="text-xs text-zinc-500 bg-zinc-100 w-fit px-2 py-1 rounded my-2">
            Feb 2024 &ndash; May 2025
          </p>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Co-founded a proptech platform for co-living operations in Pune region.
              </li>
              <li>
                Designed end-to-end system architecture across mobile, backend, databases, and cloud infrastructure.
              </li>
              <li>
                Built the mobile application using React Native, focusing on performance, reusable components, and state management.
              </li>
              <li>
                Designed DynamoDB data models, access patterns, AWS Lambda functions using Java for serverless operations, and backend APIs.
              </li>
              <li>
                Managed S3, IAM, DNS, networking, and production deployments.
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 pb-4 max-w-full">
          <h2 className="text-xl font-bold text-zinc-900">
            ApexAI &mdash; Co-founder
          </h2>
          <p className="text-xs text-zinc-500 bg-zinc-100 w-fit px-2 py-1 rounded my-2">
            April 2025 &ndash; May 2026
          </p>
          <div className="mt-[10px] text-zinc-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Co-founded an AI engineering company building AI platforms, automation, and data systems.
              </li>
              <li>
                Designed end-to-end architectures across AI/ML, backend, cloud, and data engineering.
              </li>
              <li>
                Built a faculty Performance-Based Appraisal System (PBAS) to automate and simplify the performance assessment process.
              </li>
              <li>
                Built RAG agents and AI assistants using Python, CrewAI, and LLM frameworks.
              </li>
              <li>
                Developed ETL pipelines, web scrapers, and real-time data workflows.
              </li>
              <li>
                Built full-stack applications using React, Next.js, Node.js, Flask, and FastAPI.
              </li>
              <li>
                Developed computer vision and medical AI systems, including chest X-ray reasoning agents.
              </li>
            </ul>
          </div>
        </div>
      </section>
      
    </Layout>
  );
};
