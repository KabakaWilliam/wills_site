import { getBlogPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog-list";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navigation />
      <main>
        <section className="blog-section">
          <div className="blog-header">
            <h1>Blog</h1>
            <p>Thoughts on building, design, and technology</p>
          </div>
          <BlogList posts={posts} />
        </section>
      </main>
      <Footer />
    </>
  );
}
