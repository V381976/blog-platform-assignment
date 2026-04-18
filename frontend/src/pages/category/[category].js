import Link from "next/link";
import { getAllBlogs } from "../../services/blogService";

export default function CategoryPage({ blogs, category }) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Category: {category}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
       {blogs.categories?.map((category) => (
  <Link
    key={category}
    href={`/category/${category}`}
    className="bg-blue-100 px-3 py-1 rounded"
  >
    {category}
  </Link>
))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const allBlogs = await getAllBlogs();

 const blogs = allBlogs.filter((blog) =>
  blog.categories.some(
    (cat) => cat.toLowerCase() === category.toLowerCase()
  )
);

  return {
    props: {
      blogs,
      category,
    },
  };
}