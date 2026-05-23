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
          <Link
            href={`/blog/${post.slug}`}
            className="blog-item-content"
          >
            <div className="blog-item-meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-excerpt">{post.excerpt}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}