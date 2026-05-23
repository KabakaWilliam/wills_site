import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Use first post image for top card
  const featuredPost = posts[0];

  return (
    <>
      <Navigation />
      <main>
        <section className="blog-section bg-[#f5f6f7]" id="blog">
          <div className="container">
            <article className="blog-item featured">
              <div className="blog-item-content">
                <div className="blog-item-meta">
                  <span>
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  {featuredPost.author && (
                    <span>• by {featuredPost.author}</span>
                  )}
                </div>
                <h2 className="blog-title">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="blog-excerpt">{featuredPost.excerpt}</p>
              </div>
              <div className="blog-item-image">
                <img
                  src={`https://placehold.co/400x300/de0000/ffffff?text=${featuredPost.title.slice(0, 20)}`}
                  alt={featuredPost.title}
                />
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="read-more-btn"
              >
                Read the story
              </Link>
            </article>

            <div className="blog-header">
              <h1>Blog</h1>
              <p>
                Writing on machine learning, agentic systems, and things I am
                figuring out.
              </p>
            </div>

            <section className="blog-list">
              {posts.slice(0, featuredPost ? -1 : 0).map((post) => (
                <article key={post.slug} className="blog-item">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-item-content"
                  >
                    <div className="blog-item-meta">
                      <span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </span>
                      {post.author && (
                        <span>• by {post.author}</span>
                      )}
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}