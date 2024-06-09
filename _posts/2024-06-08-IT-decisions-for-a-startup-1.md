---
title: IT Infrastructure decisions for a startup
date: 2024-06-08 14:10:00 +0800
categories: [backend, system-design]
tags: [startup, system-design]
render_with_liquid: false
comments: true
mermaid: true
image:
  path: /assets/img/content/web-architecture/modularity.png
  alt: Modularity of applications
---

Decisions are the hardest to make, especially when its a choice between where you are and where you should be

I joined hosteze in Feb 2024. The buisness idea was clear back then. I offered the missing part the that team was missing, IT. Recently we did a [survey](https://adimail.github.io/posts/telegram-scrapping/) for the room listings happening on social media, and the numbers for our potential customers were terrific.

## Background

[Hosteze](https://hosteze.in/about) is a student focused accommodation platform to find rooms and roomates in your area. We are currently based in pune, but in comming few years we are planning on expanding to other major cities in india.

_We also have another product, more on that later_

From the essays of paul graham, I have learnt that we should start from building systems that dont scale. A great example is the Doordash founders literally being delivery drivers for their first customers. He suggests that the right things to do can sometimes seem inconsequential and laborious at the time, but that early-stage startups should ask themselves how big their company could get if they did the right things.

## Study

### 1. Shopify

Shopify uses a monolithic architecture built with Ruby on Rails and MySQL. They have one of the largest Ruby on Rails codebases in existence. Shopify’s core monolith has over 2.8 million lines of Ruby code and 500,000 commits. Rails doesn’t provide patterns or tooling for managing the inherent complexity and adding features in a structured, well-bounded way. The company's main user-facing functionality is served by a single large application called "Shopify Core". However, internally, the monolith is split into multiple components that focus on different business domains. Shopify has also built custom machinery to enforce coding standards and API boundaries between components.

They call this arcitecture **Modular Monolith**

### 2. Sources

The architecture of websites, as displayed in the Chrome DevTools' _Sources_ tab, provides a high-level overview of the different resources and scripts that are loaded to render and manage the website

1. Airbnb

![Airbnb Source](/assets/img/content/web-architecture/airbnbsource.png)

Airbnb’s architecture demonstrates a common pattern in modern web applications:

- Main Domain: Serves the core HTML and dynamically loaded content.
- CDNs and Subdomains: Used for hosting static assets and external scripts to enhance performance and scalability.
- Service Workers: Employed for progressive web app features like offline access and faster load times.
- Third-Party Integrations: Scripts from services like Google Tag Manager and Facebook for analytics, marketing, and social media functionalities.

2. Shopify

![shopify Source](/assets/img/content/web-architecture/shopifysource.png)

3. Trivago

![Trivago Source](/assets/img/content/web-architecture/trivagosource.png)

**Why Distribute Assets Across Different Servers?**

- Performance: By distributing assets, we can leverage CDNs that serve static content closer to users, reducing latency and improving load times.
- Scalability: Offloading static assets and media to dedicated servers or CDNs reduces the load on the primary server, allowing it to handle more requests efficiently.
- Security: Isolating services like authentication, tracking, and GDPR management can enhance security by limiting the attack surface.

## Infrastructure

### Overview

When I started working on the application, I had a vague idea about the scale of audience we are going to serve, until we conducted our survey. We came across few social media groups with over _**300 thousand plus members**_. It was evident, the velocity and volume of the application users is going to be huge.

One thing I am trying to achive is, doing the hard things and keeping an open mind.

I am not expecting to get to a scale of a million users atm, but its generally a good idea to have at the back of mind how this can be done. I want to be preperaed and have a mental model of how my arcitecture and infrastructure can look like when that time comes.

Here are two major things I want to tackle:

- Managing a huge amount of web traffic
  - increased number of API requests
  - increased data base connections
  - realtime CRUD operations
- Storing media files
  - images add a lot of load to a web server, so it is generally a good idea to have a seperate service for the images.

Our application will me a **NextJS modular monilith**. I do not endorse NextJS like [theo](https://www.youtube.com/@t3dotgg) does, but I respect its value.

- integrated tooling (ssr, ssg, API routes)
- webpack config
- faster iteration cycles, good for development teams
- performance optimisization (code splitting)
- unified codebase

All these things improves DX.

The CRM tool for hosteze is built using Astro by the way. Superfast and lightweight. I built an ETL data pipeline and used astro for the UI.

### Arcitecture

**[We need modules not microservices](https://youtu.be/ivjPzOoPZsM?si=F2s5kga24stxfrTu)**. Period. Nothing is quite so permanent as a temporary solution.

I've been thinking lately, that literally every approach is shitty, and there is no holy grail. Your role as an architect is to pick the least shitty option, not the best one.

We are a small team, pre PMF. The amount of traffic we are expecting is managable. Using bullet points to an system design blog, wiered. I am going to do it anyway.

- it should scale horizontally
  - always easier to add new servers, than adding more ram
- application layer should be stateless
  - we need a user on one ip to stay with a certain server, otherwise they can move across the servers and the cookies and sessions can get lost
- use managed services
  - as a developer we want to focus on the application layer and less on maintainance and health of our clusters
- Set Up CDN
  - Configure a CDN like CloudFront for static assets.
- Use a dedicated media server
  - Cloudinary or Imgix for optimized image and video delivery
- Cache data
  - putting database connection open for too long is expensive
  - use redis

images and videos add a lot of load to a web server, so it is generally a good idea to have a seperate service for the images.

If we use an S3 bucket to store the static files including hero images and videos, it can be used with a CDN to improve the speed and security of content delivery to users. AWS offers a CDN called _Amazon CloudFront_ that can be integrated with S3 to host and distribute static content. but since our userbase is located in a same geographical area, cloudfront is not necessary for now. We can use a CDN when our users are spread across India.

```mjs
// next.config.mjs
module.exports = {
  assetPrefix: "https://cdn.yourdomain.com",
  images: {
    domains: [
      "cdn.yourdomain.com",
      "imgcy.hosteze.com",
      "hosteze.s3.amazonaws.com",
    ],
  },
};
```

### Moduler monilith

_A modular monolith is an architectural pattern that structures the application into independent modules or components with well-defined boundaries. The modules are split based on logical boundaries, grouping together related functionalities. This approach significantly improves the cohesion of the system_

A monolith is an architectural pattern where all components are deployed as a single physical deployment unit.

Here's an interesting quote from Martin Fowler:

> You shouldn't start a new project with microservices, even if you're sure your application will be big enough to make it worthwhile.

The biggest difference between modular monoliths and microservices is how they're deployed. Microservices elevate the logical boundaries inside a modular monolith into physical boundaries.

Microservices give you a clear strategy for modularity and decomposing the bounded contexts. But, you can also achieve this without building a distributed system. The problem is people end up using microservices to enforce code boundaries.

![Modular Monolith vs Microservices](/assets/img/content/web-architecture/modularity.png)
_Modular Monolith vs Microservices_

The modular monolithic architecture divided our application logic into modules and each module will be independent and isolated. Then, each module should have its own business logic — and, if necessary, its database or schema.

This is a modular arcutecture project structure in a nutshell:

```
project/
│
├── public/                  # Static files (images, fonts, etc.)
│   ├── images/
│   └── ...
└── src/                     # Source files
    ├── components/          # Shared/reusable components
    │   ├── common/          # Common UI components (buttons, inputs, etc.)
    │   ├── layout/          # Layout components (header, footer, etc.)
    │   └── modules/         # Feature-specific components
    │       ├── listings/
    │       ├── bookings/
    │       ├── users/
    │       └── ...
    ├── hooks/               # Custom hooks
    ├── lib/                 # Utility functions and libraries
    ├── modules/             # Feature modules
    │   ├── listings/        # Listings feature
    │   │   ├── components/
    │   │   ├── pages/
    │   │   └── api/
    │   ├── bookings/        # Bookings feature
    │   │   ├── components/
    │   │   ├── pages/
    │   │   └── api/
    │   ├── users/           # Users feature
    │   │   ├── components/
    │   │   ├── pages/
    │   │   └── api/
    │   └── ...
    ├── app/                 # Next.js pages
    │   ├── api/             # API routes
    │   ├── listings/        # Listings pages
    │   ├── bookings/        # Bookings pages
    │   ├── users/           # Users pages
    │   └── index.tsx        # entrypoint
    ├── styles/              # Global styles
    ├── types/               # TypeScript types
    └── utils/               # Utility functions

```

This structure helps in organizing the Next.js app in a modular fashion, making it easier to manage and scale. Each module is self-contained, which improves code readability and maintainability.

load balancers can cost extra money, they need to manage sessions (we need a user on one ip to stay with a certain server, otherwise they can move across the servers and the cookies and sessions can get lost), needs extra config.

### Hosting and more...

This thing needs a seperate blog post!!!
