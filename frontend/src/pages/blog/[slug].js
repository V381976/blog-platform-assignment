
import {getBlogBySlug  } from "../../services/blogService";
import SEO from "../../seo/SEO"
import BlogJsonLd from "../../seo/BlogJsonLd";

export default function BlogDetail({ blog }) {
  if (!blog) {
    return <p>Blog Not Found</p>;
  }

  return (
     <>
    <SEO
  title={blog.metaTitle || blog.title}
  description={blog.metaDescription}
  image={blog.featureImage}
/>   
    <BlogJsonLd blog={blog} />
    <div className="max-w-4xl mx-auto p-8">
      {blog.featureImage && (
        <img
          src={blog.featureImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {blog.metaDescription}
      </p>

      <div className="mb-6">
        <span className="font-semibold">Author:</span>{" "}
        {blog.author?.name}
      </div>

      <div className="prose max-w-none mb-8">
        {blog.content}
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Tags:</h3>
        <div className="flex gap-2 flex-wrap mt-2">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-600 px-3 py-1 rounded  text-amber-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold">Categories:</h3>
        <div className="flex gap-2 flex-wrap mt-2">
          {blog.categories?.map((category) => (
            <span
              key={category}
              className="bg-blue-600 px-3 py-1 rounded text-amber-900"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;

    const blog = await getBlogBySlug(slug);

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    return {
      props: {
        blog: null,
      },
    };
  }
}