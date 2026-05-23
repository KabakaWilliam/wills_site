import { getBlogPost } from "@/lib/blog";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt,
  };
}

async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-post bg-white">
      <div>
        <Link href="/blog" className="back-link">
          <span>← Back to blog</span>
        </Link>

        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
            {post.author && (
              <span>• by {post.author}</span>
            )}
          </div>
        </header>

        {post.content && <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />}
      </div>
    </main>
  );
}

export default BlogPostPage;