---
title: Web3 notes sharing app
date: 2024-05-18 14:10:00 +0800
categories: [my projects, web3]
tags: [web3, blockchain, rust]
render_with_liquid: false
comments: true
mermaid: true
---

Previously i've build a [torrent client](https://github.com/adimail/torrent-client) using golang that [bencodes](https://en.wikipedia.org/wiki/Bencode) _`.torrent`_ files to download the assets using bit torrent protocol. It was from a tutorial from [build-your-own-x](https://build-your-own-x.vercel.app/) project and it was really fun. The first time I downloaded the debian os file using my torrent client, it was a really inspiring moment for me. To watch all the pieces of the go code working together, it was so beautiful.

![torrent-client](https://raw.githubusercontent.com/adimail/torrent-client/main/assets/torrent-client-demo.gif)
_here is a demo of me downloading a debian distro from a .torrent file using bit torrent protocal_

## The idea

An application that will allow users (students) to share study materials, notes, computer programs, codes, reports and other relevant materials with each other over a decentralized network.

I am also thinking about users can upload, download, and review materials, earning native tokens as rewards for their contributions. i would also need a search engine and a recommendation system.

People can:

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

### Decentralized architecture

Decentralized architecture refers to a system design where there is no single central authority or server controlling the entire network. Instead, control and data are distributed across multiple nodes (computers) in the network.

- resilience and stability
- reduced censorship
- scalability
- security and privacy

### p2p

P2P architecture is a subset of decentralized architecture where each node in the network can act as both a client and a server. In a P2P network, nodes (peers) communicate directly with each other, sharing resources and information without needing a central server. Here are the key features and advantages

- resource sharing
- direct communication

Blockchain, DAOs and dApps are good examples of decentralized networks.

## How it will work

Imagine a network collectively owned by all the students, without any central server—just their mobile devices and personal computers. On this network, students can find, share, search, filter, sort, view, and transfer files among themselves. They don't need an internet connection to share files if they are on the same WiFi network, making it easy to share lecture notes, PDF files, and computer programs with one another.

IPFS (InterPlanetary File System) is a peer-to-peer distributed file system that aims to connect all computing devices with the same system of files. It is a protocol designed to create a more decentralized and efficient web by allowing users to store and share data in a distributed manner.

```mermaid
sequenceDiagram
    participant User as Student
    participant App as Mobile/Web App
    participant IPFSNode as IPFS Node
    participant DLT as Decentralized Ledger Technology (Blockchain)

    User->>App: Request file
    App->>IPFSNode: Check if file is available locally
    IPFSNode-->>App: File not available
    App->>IPFSNode: Query IPFS network for file
    IPFSNode->>+IPFSNetwork: Broadcast file request
    IPFSNetwork-->>-IPFSNode: File located on another node
    IPFSNode-->>App: File available at another node
    App->>IPFSNode: Request file from the other node
    IPFSNode->>+OtherIPFSNode: Request file
    OtherIPFSNode-->>-IPFSNode: Send file data
    IPFSNode-->>App: File received
    App->>User: Deliver file

    User->>App: Upload new file
    App->>IPFSNode: Store file on IPFS
    IPFSNode->>IPFSNode: Generate unique file hash (CID)
    IPFSNode->>+IPFSNetwork: Announce new file with CID
    IPFSNetwork-->>-IPFSNode: Acknowledge file storage
    IPFSNode->>DLT: Update metadata on blockchain
    DLT-->>IPFSNode: Confirm metadata update
    IPFSNode-->>App: File stored with CID
    App-->>User: File uploaded successfully with CID
```

### 1. File Request:

- The student requests a file through the mobile app.
- The app checks if the file is available locally on
- its connected IPFS node.
- If not available, the app queries the IPFS network for the file.
- The IPFS network locates the file on another node and informs the app.
- The app requests the file from the other IPFS node.
- The file is transferred from the other IPFS node - to the app, and then to the student.

### 2. File Upload:

- The student uploads a new file via the mobile app.
- The app stores the file on the connected IPFS node.
- The IPFS node generates a unique file hash (CID) for the file.
- The IPFS node announces the new file with the CID to the IPFS network.
- The IPFS network acknowledges the file storage.
- The IPFS node updates the metadata on the decentralized ledger technology (blockchain) with the file's CID.
- The blockchain confirms the metadata update.
- The IPFS node confirms the file storage with the app.
- The app notifies the student that the file has been uploaded successfully with its CID.

## step-by-Step Plan

1. **Application Architecture**

   - **Design P2P Network**
     - Research IPFS
     - Explore libp2p
   - **Choose Blockchain Platform**
     - Consider Ethereum
     - Consider Polkadot
   - **Design Smart Contracts**
     - User Identity Contracts
     - Content Metadata Contracts

1. **Core Components**

   - **User Authentication**
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

1. **User Interface**

   - **Frontend Development**
     - Use React or Vue.js
     - Integrate with Web3.js or Ethers.js
   - **Backend Development**
     - Use Rust for Backend
     - Create REST APIs with Actix or Rocket

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

This is the first fost of manny to come of my progress with this application

I also have end semester exams from next tuesday (3 days to go). i also need to take time out from my startup to get this done. next thing i am going to do is create an wireframe for the app, then study p2p, then create a flutter boiler plate.

One might think why am i having too many things on my plate at the same time. but thats the way i am.

So much to learn, so little time 🪽
