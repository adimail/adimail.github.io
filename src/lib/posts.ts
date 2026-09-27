export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDayMonth = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getUTCMonth()];

  return `${day} ${month}`;
};

const calculateReadTime = (content: string): string => {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*_~>\-[\]()!]/g, '')
    .trim();

  const words = cleanContent.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

const parseFrontmatter = (fileContent: string) => {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const data: Record<string, string> = {};

  rawYaml.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      if (key) {
        data[key] = val;
      }
    }
  });

  return { data, content };
};

const rawPosts = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const getAllPosts = (): Post[] => {
  const posts: Post[] = Object.entries(rawPosts).map(([filepath, rawContent]) => {
    const slug = filepath.split('/').pop()?.replace('.md', '') || '';
    const { data, content } = parseFrontmatter(rawContent);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      readTime: calculateReadTime(content),
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return getAllPosts().find((post) => post.slug === slug);
};
