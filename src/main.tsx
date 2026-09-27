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
import { NotFound } from './pages/NotFound';

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

const AnalyticsTracker: React.FC = () => {
  const routerState = useRouterState();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-54DJJSHDCM', {
        page_path: routerState.location.pathname,
      });
    }
  }, [routerState.location.pathname]);

  return null;
};

const RootComponent: React.FC = () => {
  return (
    <>
      <AnalyticsTracker />
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
