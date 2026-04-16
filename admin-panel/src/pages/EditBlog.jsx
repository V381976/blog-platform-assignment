import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormStatus } from "react-dom";
import {
  getBlogById,
  updateBlog,
} from "../Services/blogService";

/* React 19 Submit Button */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-6 py-3 rounded w-full hover:bg-gray-800 transition"
    >
      {pending ? "Updating..." : "Update Blog"}
    </button>
  );
}

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    featureImage: "",
    tags: "",
    categories: "",
    status: "Draft",
  });

  const fetchBlog = async () => {
    try {
      const data = await getBlogById(id);

      setFormData({
        ...data,
        tags: data.tags.join(", "),
        categories: data.categories.join(", "),
      });
    } catch (error) {
      console.log(error);
      setError("Failed to fetch blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* React 19 Form Action */
  const handleUpdateBlog = async () => {
    try {
      await updateBlog(id, {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()),
        categories: formData.categories.split(",").map(cat => cat.trim()),
      });

      navigate("/blogs");
    } catch (error) {
      console.log(error);
      setError("Update Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Blog
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <form action={handleUpdateBlog} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="content"
          rows="6"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="featureImage"
          value={formData.featureImage}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <SubmitButton />
      </form>
    </div>
  );
};

export default EditBlog;