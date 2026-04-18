import Link from "next/link";
import { getAllBlogs } from "../../services/blogService";

export default function TagPage({ blogs, tag }) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Tag: {tag}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
     {blogs.tags?.map((tag) => (
  <Link
    key={tag}
    href={`/tag/${tag}`}
    className="bg-gray-200 px-3 py-1 rounded"
  >
    {tag}
  </Link>
))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { tag } = context.params;
  const allBlogs = await getAllBlogs();

 const blogs = allBlogs.filter((blog) =>
  blog.tags.some(
    (t) => t.toLowerCase() === tag.toLowerCase()
  )
);

  return {
    props: {
      blogs,
      tag,
    },
  };
}