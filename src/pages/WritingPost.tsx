import React, { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { getPostBySlug } from '../lib/posts';
import { BlogLayout } from '../components/BlogLayout';
import { NotFound } from './NotFound';

export const WritingPost: React.FC = () => {
  const { slug } = useParams({ strict: false }) as { slug?: string };

  if (!slug) {
    return <NotFound />;
  }

  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — adimail`;
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return <BlogLayout post={post} />;
};

