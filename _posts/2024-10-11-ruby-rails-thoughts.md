---
title: Thoughts on Ruby on rails
date: 2024-10-11 14:10:00 +0800
categories: [web]
tags: []
render_with_liquid: false
comments: true
mermaid: true
image:
  path: /assets/img/content/web/rails.png
  alt: Ruby on rails
---

Before starting with Ruby, I want to write about one of the key figures behind its rise, David Heinemeier Hansson, better known as DHH. He’s an interesting character – not only because he created the popular Ruby on Rails (RoR) framework but also because he’s a man who isn’t afraid to go against the grain. I personally love him for his enthusiasm.

### The Cult of DHH

DHH is currently the CTO of Basecamp and co-founder of Hey. On one side, you have a huge number of admirers who love his work and his unapologetic style. On the other, you have those who dislike his bold opinions, which often stir controversy. He has a strong fan base, but that also brings detractors. People either seem to love him or get annoyed by his loud presence on social media, where he shares strong opinions on everything from work culture to cloud infrastructure.

For instance, in 2023, DHH wrote an article titled [_We Have Left the Cloud_](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb), where he discussed why Basecamp moved away from Amazon Web Services (AWS). His criticism of AWS—its complexity, UX, and cost—was cutting, but not new. AWS has long been known to have a steep learning curve, especially when dealing with their user interface and ecosystem.

![Devs hosting the entire company stack on a 5dollar VPS](/assets/img/content/web/devs-hosting-company-stack-on%20vps.jpeg)

### The Rise of Ruby on Rails

Ruby on Rails was born in 2003, out of the need to make web development simpler, faster, and more intuitive for developers. DHH, who had been using Ruby for some time, created Rails to solve the very problems he faced while building Basecamp. He focused on developer experience, emphasising convention over configuration, meaning developers didn’t have to spend time making trivial decisions or setting up basic things from scratch.

Since then, Rails has become a developer-friendly framework, widely adopted for building applications across industries. What made Rails revolutionary was how it allowed developers to quickly spin up an MVP. Startups like Airbnb, Shopify, GitHub, and Square owe a large part of their success to the speed and simplicity Rails offers.

The framework’s Model-View-Controller (MVC) architecture was key to its adoption, making it easy for developers to organise code in a structured way while offering a templating system that handled much of the heavy lifting on the UI side. In many ways, Ruby on Rails changed how we think about building web applications today by promoting quick iteration cycles and developer happiness. It helped normalise the idea of fast movinf MVC model where we are defining things on a backend largly around the database and creating UI using templeting systems.

However, as with any framework, Rails isn’t without its quirks.

### Ruby on Rails: Great, but Not Without Challenges

Ruby is not very popular from where I come from. But hey, even java is unknown in my college so my sample size is very small and biased. Rails, although once a giant in the web development world, has somewhat waned in popularity as newer technologies like Node.js, Python with Django, or JavaScript frameworks like React and Vue. That said, it remains an incredibly powerful and flexible tool, especially for smaller, fast-moving projects.

I learnt Ruby out of curiosity to build an dashboard for a personal project. I kinda liked it. The developer experience was good. Ruby is designed to make developers feel comfortable, with its clean syntax and human-readable language.

Rails can become complex when you start diving into larger projects, especially when dealing with many third-party libraries or "gems." It’s true that gems, which are one of the pillars of the Ruby ecosystem, can sometimes feel like a double-edged sword. You get a lot of power and functionality out of the box, but it’s not always easy to debug when things go wrong or when a gem overrides behaviour in unexpected ways.

I struggled to reason about the Rails stack at first, and that's a common challenge, especially for beginners like myself. Rails does so much behind the scenes that figuring out why something is happening can become tricky. This "magic" that Rails provides—while powerful—can sometimes leave developers scratching their heads. When things go wrong, it can feel like the framework itself is working against you, making debugging a bit of a hassle.

Still, Rails helped normalise the idea of fast-moving development cycles with the MVC pattern, where much of the logic is structured around the database and templates are used for rendering views. It’s influenced how many modern frameworks work today, even those built in other languages.

### The Future of Ruby on Rails and DHH's Legacy

While Ruby on Rails might not be the hottest technology of the moment, it remains an essential tool in the web development world. DHH’s vision, of creating a framework that prioritised developer happiness and productivity, continues to be realised in companies around the globe. Python is very similar to Ruby but has way more applications (and probably jobs).

If you have read so far, you'd be also intersted in learning technologies like Elixir and Scala.

DHH has [shared](https://www.reddit.com/r/linux/comments/1d9qhgx/creator_of_ruby_on_rails_shows_off_his_new_ubuntu/) his ubuntu setup and lets us copy it in single command. Shell tools, web apps, beautiful UI and terminal. You can checkout [Omakub site](https://omakub.org/) for more details and read its [mannual](https://manual.omakub.org/) for a walkthrough. I love the website btw, it has such cool UI and is very user friendly. especially the bookmark feature. It is built using [writebook](https://once.com/writebook), Writebook is simple software that allows you to publish text and pictures in a simple, browsable online book format.
