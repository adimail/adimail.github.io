export interface Book {
  id: string;
  title: string;
  author: string;
  thickness: number;
  coverImage: string;
  spineColor: string;
  spineTextColor: string;
  yearRead: number;
  notes: string[];
}

export const booksData: Book[] = [
  {
    id: 'staff-engineers-path',
    title: "The Staff Engineer's Path",
    author: 'Tanya Reilly',
    thickness: 0.52,
    coverImage: '/assets/images/books/staffeng.jpeg',
    spineColor: '#0369a1',
    spineTextColor: '#f0f9ff',
    yearRead: 2024,
    notes: [
      'Even though this book is written for engineers transitioning from senior to staff roles, reading it as a fresher helped clarify my long-term goals. I want to build towards senior technical leadership, and this is one of the only books that maps out that specific ladder instead of pushing you toward the manager track.',
      'The book shows that reaching higher levels of technical influence requires strong organizational skills, not just domain knowledge. You need to know how to navigate company dynamics, communicate across departments, and pick projects that align with actual business priorities.',
      'Core takeaways:',
      'Writing technical documents like RFCs and roadmaps helps build consensus and avoids misunderstandings across teams before work begins.',
      'When leading cross-team initiatives, technical leads are responsible for clarifying roles, removing roadblocks, and ensuring software is built with long-term maintenance in mind.',
      'Senior engineers set the cultural baseline for a team through consistent behavior, disciplined testing habits, and an ability to stay calm during outages or sudden project changes.'
    ]
  },
  {
    id: 'ddia',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    thickness: 0.85,
    coverImage: '/assets/images/books/data.jpg',
    spineColor: '#0f766e',
    spineTextColor: '#ffffff',
    yearRead: 2024,
    notes: [
      'This took me about five months of consistent reading to get through, and for good reason. It is dense, thorough, and reads more like a university textbook than a standard tech guide. As an early-career engineer, reading this helped me look past database buzzwords and understand how modern data systems are actually built under the hood.',
      'The biggest takeaway is that there is no such thing as a universally "best" database or architecture. Every design decision is a trade-off between reliability, scalability, and maintainability. Kleppmann systematically explains the underlying mechanics so you can evaluate tools based on how your system handles reads, writes, and hardware failures.',
      'And every senior engineer I come across has already read this book,'
    ]
  },
  {
    id: 'cp-handbook',
    title: "Competitive Programmer's Handbook",
    author: 'Antti Laaksonen',
    thickness: 0.42,
    coverImage: '/assets/images/books/cp.jpeg',
    spineColor: '#1e293b',
    spineTextColor: '#f8fafc',
    yearRead: 2023,
    notes: [
      'A concise reference for core algorithms, especially dynamic programming and tree queries under tight execution constraints. I still pull it up when I need an efficient baseline implementation.'
    ]
  },
  {
    id: 'homl',
    title: 'Hands-On Machine Learning',
    author: 'Aurélien Géron',
    thickness: 0.78,
    coverImage: '/assets/images/books/homlwslkatf.jpeg',
    spineColor: '#b91c1c',
    spineTextColor: '#ffffff',
    yearRead: 2024,
    notes: [
      'A solid balance between the underlying math and working Scikit-Learn or TensorFlow code. It explains production pipelines and training routines without getting bogged down in theory.'
    ]
  },
  {
    id: 'pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas and Andrew Hunt',
    thickness: 0.62,
    coverImage: '/assets/images/books/tpp.jpg',
    spineColor: '#1e3a8a',
    spineTextColor: '#eff6ff',
    yearRead: 2023,
    notes: [
      'Sensible reminders on daily engineering habits. The emphasis on automated testing, decoupled components, and cleaning up messy code before it spreads is always worth revisiting.'
    ]
  },
  {
    id: 'smlxl',
    title: 'S,M,L,XL',
    author: 'Rem Koolhaas',
    thickness: 1.15,
    coverImage: '/assets/images/books/smlxl.jpg',
    spineColor: '#e2e8f0',
    spineTextColor: '#0f172a',
    yearRead: 2025,
    notes: [
      'A massive volume focused on physical architecture, but it connects well to software engineering. Koolhaas shows how standard design patterns break down when a structure crosses past a certain physical scale.'
    ]
  },
  {
    id: 'creative-act',
    title: 'The Creative Act: A Way of Being',
    author: 'Rick Rubin',
    thickness: 0.65,
    coverImage: '/assets/images/books/tcaawob.jpg',
    spineColor: '#18181b',
    spineTextColor: '#fafafa',
    yearRead: 2024,
    notes: [
      'Helpful perspective on removing distractions and stripping a project down to its core idea. The advice applies just as well to building simple software as it does to artistic work.',
      'It works much better as a bedside or desk book where you read two or three pages at a time rather than trying to plow through it cover to cover. While some of the language leans into abstract or spiritual framing, the underlying advice is simple, sensible, and focused on building daily momentum.'
    ]
  },
  {
    id: 'norwegian-wood',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    thickness: 0.52,
    coverImage: '/assets/images/books/nw.jpg',
    spineColor: '#831843',
    spineTextColor: '#fdf2f8',
    yearRead: 2023,
    notes: [
      'A grounded story about grief and the transition into adulthood. It reads quite differently from Murakami\'s surrealist novels because it focuses entirely on realistic personal relationships.'
    ]
  },
  {
    id: 'kite-runner',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    thickness: 0.56,
    coverImage: '/assets/images/books/tkr.jpg',
    spineColor: '#78350f',
    spineTextColor: '#fef3c7',
    yearRead: 2023,
    notes: [
      'A friend gave me a hard copy of this book and recommended it to me. It was originally gifted to her, and she later passed it on to me, so I really like the little journey this book has had from one reader to another (fyi I am not half a reader that she is). I don’t usually read this kind of fiction, but the premise drew me in pretty quickly. After finishing it, I’m definitely planning to read A Thousand Splendid Suns next.'
    ]
  },
  {
    id: 'mrityunjay',
    title: 'Mrityunjay',
    author: 'Shivaji Sawant',
    thickness: 0.98,
    coverImage: '/assets/images/books/mrityunjay.jpg',
    spineColor: '#9a3412',
    spineTextColor: '#ffedd5',
    yearRead: 2022,
    notes: [
      'Back in senior high school, an athletic injury put me on bed rest for three months, and I read this book twice during that time. It gives the best portrayal of Karna from the Mahabharata.'
    ]
  }
];
