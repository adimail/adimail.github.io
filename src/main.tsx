import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';

import './index.css';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { FunProjects } from './pages/FunProjects';
import { Hackathons } from './pages/Hackathons';
import { OpenSource } from './pages/OpenSource';
import { Papers } from './pages/Papers';
import { Work } from './pages/Work';
import { RandomImage } from './pages/RandomImage';
import { Writings } from './pages/Writings';
import { WritingPost } from './pages/WritingPost';
import { ReadingPage } from './pages/ReadingPage';
import { NotesPage } from './pages/NotesPage';
import { NotFound } from './pages/NotFound';
import { getPostBySlug } from './lib/posts';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-54DJJSHDCM';

const STATIC_TITLES: Record<string, string> = {
  '/': 'adimail',
  '/about': 'about — adimail',
  '/projects': 'projects — adimail',
  '/funproj': 'fun projects — adimail',
  '/hackthons': 'hackathons — adimail',
  '/opensource': 'open source — adimail',
  '/papers': 'papers — adimail',
  '/work': 'work — adimail',
  '/img': 'random image — adimail',
  '/writings': 'writings — adimail',
  '/reading': 'reading — adimail',
  '/notes': 'notes — adimail',
  '/notes.md': 'notes.md — adimail',
};

const resolvePageTitle = (pathname: string): string => {
  if (STATIC_TITLES[pathname]) {
    return STATIC_TITLES[pathname];
  }
  if (pathname.startsWith('/writings/')) {
    const slug = pathname.replace('/writings/', '').replace(/\/$/, '');
    const post = getPostBySlug(slug);
    if (post) {
      return `${post.title} — adimail`;
    }
  }
  return '404 — adimail';
};

const PageTracker: React.FC = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const title = resolvePageTitle(pathname);
    document.title = title;

    if (!import.meta.env.PROD) {
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

const RootComponent: React.FC = () => {
  return (
    <>
      <PageTracker />
      <Outlet />
    </>
  );
};

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: Projects,
});

const funProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/funproj',
  component: FunProjects,
});

const hackathonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hackthons',
  component: Hackathons,
});

const openSourceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/opensource',
  component: OpenSource,
});

const papersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/papers',
  component: Papers,
});

const workRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/work',
  component: Work,
});

const imgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/img',
  component: RandomImage,
});

const writingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/writings',
  component: Writings,
});

const writingPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/writings/$slug',
  component: WritingPost,
});

const readingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reading',
  component: ReadingPage,
});

const notesMdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notes.md',
  component: NotesPage,
});

const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notes',
  component: NotesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  projectsRoute,
  funProjectsRoute,
  hackathonsRoute,
  openSourceRoute,
  papersRoute,
  workRoute,
  imgRoute,
  writingsRoute,
  writingPostRoute,
  readingRoute,
  notesMdRoute,
  notesRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

