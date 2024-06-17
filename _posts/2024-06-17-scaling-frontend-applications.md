---
title: Scaling frontend applications
date: 2024-06-17 14:10:00 +0800
categories: [web]
tags: [documentation]
render_with_liquid: false
comments: true
mermaid: true
image:
  path: /assets/img/content/web/ts-eslint.png
  alt: Typescript ESlint
---

_**Most application have problem not to scale some performance metric but scaling the team and codebase.**_

Scaling a web application is not as easy as I thought it would. Both aspects, scaling the application to hundreds of thousands of users and in general scaling the team as the complexity of the application grows. I had worked on big ~~javascript~~ typescript projects, and I was building the stuff myself both personal and professional.

When I started building projects in a team, I learnt that developer experience (DX) is a crucial part of scaling. Not just the programmers, every team is an DX team. DX is like UX for developers. How they use the tools, how they navigate the codebase and the application features. As more UI components, screens and pages are added on the application, there comes a point where its hard to keep track of changes happening in our application.

## Key Considerations

- Team Scalability: As your application grows, so will your team. Fostering a culture of code ownership, collaboration, and efficient DX is crucial. This includes adopting robust version control practices, clear documentation, and well-defined code structure.
- Performance Optimization: User experience hinges on rapid responsiveness. Techniques like code splitting, lazy loading, and efficient data fetching strategies minimize page load times and ensure a smooth user experience. Leverage browser caching mechanisms to further enhance performance.
- Architectural Choices: The architectural approach significantly impacts scalability. This enables parallel development, easier maintenance, and improved maintainability.
- Tooling Ecosystem: tooling ecosystem to streamline development workflows. Git, CI/CD pipelines, and automated testing frameworks ensure code quality, maintainability, and rapid feature rollouts.

## Typescript and Linting rules

**consistency is the key**

Having a typesystem will almost always best an untypes language. Typescript basically is a linter in itself with which you can supply extra information (types). We want to add further safety by introducing eslint. If you are using a [T3 stack](https://create.t3.gg/) you get a pretty strong es linting rules out of box. If you are looking for working on a new project, I recemond use T3 stack as the boilerplate. Such a gem.

![Create T3 App](/assets/img/content/web/t3.png)
_Create T3 App_

Also please checkout the [Airbnb coding guidlines](https://github.com/airbnb/javascript). Pretty useful linting guide for developers.

## Project structure and contributions

Matle Ubl (CTO at vercel) talked about his first time at the startup. At that time, `npm` announced `private modules` that allowed developers to share code as npm packages. This is a really bad approach because the teams have to regularly update their _package.json_ files. And this can be a potential bottleneck when the application size grows.

In a team, we need to foster collaboration and ownership through a monorepo structure. This could be a bad idea in a sense that anyone on the team can just delete code, but after all software engineering is about trade-offs. We can use access restrictions to specific parts within the monorepo to manage contributions. On github we can setup CODEOWNERS file [(read more about _CODEOWNERS_)](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) that can restrict certain parts of codebases to teams or users, or require peer reviews from specific people.

## Deleting Code

We have heard about loosely coupled arcitecture in numerous places. We want the code components independent of each other and minimize the dependencies between an application's components. This is really helpful for large-scale changes. Teams can make major design changes without needing permission from others or depending on other teams, makes the decisions less haulting.

### utility-first approach

Use a utility-first approach such as tailwind which reduces the amount of CSS you need to write, but it also avoids needing an adjacent CSS file for each React component. One of the most under appreciated advantages of using tailwind CSS is that we no longer have to create names for all our code components.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Every once in awhile, I see some CSS classnames that make me very thankful I&#39;m a Tailwind guy now <a href="https://t.co/ws04Y2HXUs">pic.twitter.com/ws04Y2HXUs</a></p>&mdash; Theo - t3.gg (@t3dotgg) <a href="https://twitter.com/t3dotgg/status/1799000349421994262?ref_src=twsrc%5Etfw">June 7, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Tailwind makes the code co-located. So whenever we delete the component, all the related code is deleated, leaving no stale code behind. All other components shall be build with this philosophy.

this is my code structure snippet:

```
│
├── modules/
│   ├── user/
│   │   ├── components/
│   │   │   ├── component1.tsx
│   │   │   └── component2.tsx
│   │   └── index.ts/
│   ├── product/
│   │   ├── components/
│   │   │   ├── component1.tsx
│   │   │   └── component2.tsx
│   │   └── index.ts/
│   └── ...
└── ...
```

each component will have a default export and instead of importing the component from the `@/modules/users/components/component1` we can import it from `@/modules/users`

```tsx
// @/modules/users/components/component1.tsx
const Component1 = () => {
  return <div>Component1</div>;
};

export default Component1;
```

```tsx
// @/modules/users/index.ts
import Component1 from "./components/colleges";
import Component2 from "./components/scrollview";

export { Component1, Component2 };
```

```tsx
// Using the module components
import { Component1, Component2 } from "@/modules/users";

export default function Page() {
  return (
    <main>
      <Component1 />
      <Component2 />
    </main>
  );
}
```

## Data Fetching

Delegate data fetching to child components. Not all data needs to be at the top level of the applications.

```tsx
import type { FC } from "react";
import { Customer } from "@/modules/user";

type CustomerProps = { customerId: string };

export const Sidebar: FC<CustomerProps> = ({ customerId }) => (
  // Data fetching done in Customer component
  <Cart customerId={customerId} />
);
```

### Migrate incrementally

Scale the application through incremental migrations rather than massive overhauls. Take small steps and gradually migrate parts of the codebase to mitigate risks.

### Shared state managment - zustand

Benefits of Using Zustand:

- Simple API: concise and easy-to-understand API for creating and managing state.
- Immutability: enforces immutability, ensuring predictable state updates and avoiding unintended side effects.
- React Hooks Integration: seamlessly integrates with React hooks, allowing for a clean and functional approach to state management.
- Lightweight: has a small bundle size, making it suitable for performance-critical applications.

![Airbnb Source](/assets/img/content/web/zustand.webp)

We create a store for our states and then the zustand store API can be used globally

```ts
import { create } from "zustand";
import type { StoreApi, UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";

export type Gender = "male" | "female" | "any";

export interface State {
  query: string;
  gender: Gender;
}

interface Action {
  setQuery: (query: string) => void;
  setGender: (gender: Gender) => void;
}

export const useStateStore = create<State & Action>()(
  persist(
    (set) => ({
      query: ``,
      gender: "any",

      setQuery: (query) => set(() => ({ query })),
      setGender: (gender) => set(() => ({ gender })),
    }),
    {
      name: "application-storage",
      partialize: (state) => ({
        autoSync: state.autoSync,
      }),
    }
  )
);

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useStore = createSelectors(useStateStore);
```

Checkout the [zustand store code](https://github.com/adimail/mermaid-editor/blob/main/mermaid-mind/src/store.ts) for a webappliction I build few back.

---

I am still learning. Documentation is a subject that is highly underrated, for sure.
