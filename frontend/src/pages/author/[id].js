import Link from "next/link";
import { getAllBlogs } from "../../services/blogService";

export default function AuthorPage({ blogs, authorName }) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
      <Link
  href={`/author/${blogs.author?._id}`}
  className="text-blue-600"
>
  {authorName}
</Link>
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blog/${blog.slug}`}>
            <div className="border p-4 rounded cursor-pointer">
              <h2 className="font-bold">{blog.title}</h2>
              <p>{blog.metaDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const allBlogs = await getAllBlogs();

  const blogs = allBlogs.filter(
    (blogs) => blogs.author?._id === id
  );

  return {
    props: {
      blogs,
      authorName: blogs[0]?.author?.name || "Unknown",
    },
  };
}