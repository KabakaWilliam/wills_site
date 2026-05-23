"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <article key={post.slug} className="blog-item">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="blog-item-title">{post.title}</h3>
          </Link>
          <div className="blog-meta">
            <time className="blog-date" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.author && (
            <span className="blog-author">
              by <span className="author-name">{post.author}</span>
            </span>
          )}
          <p className="blog-excerpt">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="read-more">
            Read Story
          </Link>
        </article>
      ))}
    </div>
  );
}
