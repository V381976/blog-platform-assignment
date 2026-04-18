import Link from "next/link";
import { getAllBlogs } from "../services/blogService";


export default function Home({ blogs }) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Latest Blogs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg overflow-hidden shadow"
          >
            {blog.featureImage && (
              <img
                src={blog.featureImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {blog.metaDescription}
              </p>

              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const blogs = await getAllBlogs();

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    return {
      props: {
        blogs: [],
      },
    };
  }
}