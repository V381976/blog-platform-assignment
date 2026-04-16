import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllBlogs,
  deleteBlog,
} from "../Services/blogService";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
        console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <Link
          to="/blogs/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Blog
        </Link>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-500">
                {blog.status}
              </p>
            </div>

            <div className="space-x-2">
              <Link
                to={`/blogs/edit/${blog._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;