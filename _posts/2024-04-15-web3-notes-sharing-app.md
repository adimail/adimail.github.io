---
title: Web3 notes sharing app
date: 2024-05-18 14:10:00 +0800
categories: [my projects]
tags: [web3, blockchain, rust]
render_with_liquid: false
comments: true
mermaid: true
---

i want to learn blockchain. previously i've build a [torrent client](https://github.com/adimail/torrent-client) using golang that [bencodes](https://en.wikipedia.org/wiki/Bencode) _.torrent_ files to download the assets using bit torrent protocol. it was from a tutorial from [build-your-own-x](https://build-your-own-x.vercel.app/) project. It was really fun. the first time i downloaded the debian os file, it was a really inspiring moment for me. to watch all the pieces of the go code working together, it was so beautiful.

![torrent-client](https://raw.githubusercontent.com/adimail/torrent-client/main/assets/torrent-client-demo.gif)
_here is a demo of me downloading a debian distro from a .torrent file using bit torrent protocal_

## the idea

an application that will allow users (students) to share study materials, notes, computer programs, codes, reports and other relevant materials with each other over a decentralized network. along thw way, i will also learn rust and web3.

i am also thinking about users can upload, download, and review materials, earning native tokens as rewards for their contributions. i would also need a search engine and a recommendation system.

people can:

- share study material
  - pdf
  - computer programs
  - text files
  - notes
  - screenshots/images
- download material
- search through the content
- stay anonymous
- earning rewards for their contributions

![client-server-vs-p2p](/assets/img/content/p2p/client-server-vs-p2p.png)
_client-server vs p2p_

### decentralized architecture

decentralized architecture refers to a system design where there is no single central authority or server controlling the entire network. Instead, control and data are distributed across multiple nodes (computers) in the network.

- resilience and stability
- reduced censorship
- scalability
- security and privacy

### p2p

p2p architecture is a subset of decentralized architecture where each node in the network can act as both a client and a server. In a P2P network, nodes (peers) communicate directly with each other, sharing resources and information without needing a central server. Here are the key features and advantages

- resource sharing
- direct communication

blockchain, DAOs and dApps are good examples of decentralized networks. i once interviewed a student from pune for a backend role in our startup, he was good. his expertise was in dapps and blockchain. we didn't work out but his profile was good. now i will learn this as well and share the results on my blog.

## step-by-Step Plan

1. **Learn the Basics**

   - **Learn Blockchain Fundamentals**
     - Read Blockchain Basics
     - Read Mastering Bitcoin
   - **Learn Rust Programming**
     - Read The Rust Programming Language
     - Complete Rustlings Exercises

2. **Conceptualize the Application Architecture**

   - **Design P2P Network**
     - Research IPFS
     - Explore libp2p
   - **Choose Blockchain Platform**
     - Consider Ethereum
     - Consider Polkadot
   - **Design Smart Contracts**
     - User Identity Contracts
     - Content Metadata Contracts

3. **Develop the Core Components**

   - **Develop User Authentication**
     - Use DIDs and Verifiable Credentials
   - **Implement Content Sharing and Storage**
     - Integrate IPFS
     - Store Metadata on Blockchain
   - **Build Search and Discovery**
     - Implement Indexing Mechanism
     - Develop Discovery Algorithms
   - **Create Reputation and Reward System**
     - Smart Contract for Reputation
     - Token System for Rewards

4. **Build the User Interface**

   - **Frontend Development**
     - Use React or Vue.js
     - Integrate with Web3.js or Ethers.js
   - **Backend Development**
     - Use Rust for Backend
     - Create REST APIs with Actix or Rocket

5. **Test and Deploy**

   - **Write Unit Tests**
     - Test Rust Code
   - **Smart Contract Testing**
     - Use Truffle or Hardhat
   - **Integration Tests**
     - Conduct Integration Tests
   - **Deploy**
     - Deploy Smart Contracts on Testnet
     - Deploy Frontend and Backend

6. **Documentation and Community Engagement**
   - **Comprehensive Documentation**
     - Document Code and Usage
   - **Engage with Community**
     - Share Progress on GitHub

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffcc00', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#fff'}}}%%
graph LR
    A[Learn the Basics] --> B[Conceptualize the Application Architecture]
    B --> C[Develop the Core Components]
    C --> D[Build the User Interface]
    D --> E[Test and Deploy]
    E --> F[Documentation and Community Engagement]

    A --> A1[Learn Blockchain Fundamentals]
    A --> A2[Learn Rust Programming]

    A1 --> A1a[Read Blockchain Basics]
    A1 --> A1b[Read Mastering Bitcoin]
    A2 --> A2a[Read The Rust Programming Language]
    A2 --> A2b[Complete Rustlings Exercises]

    B --> B1[Design P2P Network]
    B --> B2[Choose Blockchain Platform]
    B --> B3[Design Smart Contracts]

    B1 --> B1a[Research IPFS]
    B1 --> B1b[Explore libp2p]
    B2 --> B2a[Consider Ethereum]
    B2 --> B2b[Consider Polkadot]
    B3 --> B3a[User Identity Contracts]
    B3 --> B3b[Content Metadata Contracts]

    C --> C1[Develop User Authentication]
    C --> C2[Implement Content Sharing and Storage]
    C --> C3[Build Search and Discovery]
    C --> C4[Create Reputation and Reward System]

    C1 --> C1a[Use DIDs and Verifiable Credentials]
    C2 --> C2a[Integrate IPFS]
    C2 --> C2b[Store Metadata on Blockchain]
    C3 --> C3a[Implement Indexing Mechanism]
    C3 --> C3b[Develop Discovery Algorithms]
    C4 --> C4a[Smart Contract for Reputation]
    C4 --> C4b[Token System for Rewards]

    D --> D1[Frontend Development]
    D --> D2[Backend Development]

    D1 --> D1a[Use React or Vue.js]
    D1 --> D1b[Integrate with Web3.js or Ethers.js]
    D2 --> D2a[Use Rust for Backend]
    D2 --> D2b[Create REST APIs with Actix or Rocket]

    E --> E1[Write Unit Tests]
    E --> E2[Smart Contract Testing]
    E --> E3[Integration Tests]

    E1 --> E1a[Test Rust Code]
    E2 --> E2a[Use Truffle or Hardhat]
    E3 --> E3a[Conduct Integration Tests]

    E --> E4[Deploy]
    E4 --> E4a[Deploy Smart Contracts on Testnet]
    E4 --> E4b[Deploy Frontend and Backend]

    F --> F1[Comprehensive Documentation]
    F --> F2[Engage with Community]
    F1 --> F1a[Document Code and Usage]
    F2 --> F2a[Share Progress on GitHub]
```

this is the first fost of manny to come of my progress with this application

i just downloaded the movie [the intern](https://letterboxd.com/film/the-intern-2015/) from torrent and am writing this article while the movie is being downloaded on my mobile.

i also have end semester exams from next tuesday (3 days to go). i also need to take time out from my startup to get this done. next thing ill do is create an wireframe for the app, then study p2p, then create a flutter boiler plate.

one might think why am i having too many things on my plate at the same time. but thats the way i am.

so much to learn, so little time 🪽
