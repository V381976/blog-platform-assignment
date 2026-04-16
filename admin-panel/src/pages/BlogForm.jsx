import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createBlog } from "../Services/blogService";

/* React 19 Submit Button */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-6 py-3 rounded w-full hover:bg-gray-800 transition"
    >
      {pending ? "Creating Blog..." : "Create Blog"}
    </button>
  );
}

const BlogForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [error, setError] = useState("");

  /* Create Blog */
  const handleCreateBlog = async (formData) => {
    try {
      await createBlog({
        title: formData.get("title"),
        content: formData.get("content"),
        metaTitle: formData.get("metaTitle"),
        metaDescription: formData.get("metaDescription"),
        featureImage: formData.get("featureImage"),
        tags: formData.get("tags")
          ?.split(",")
          .map((tag) => tag.trim()),
        categories: formData.get("categories")
          ?.split(",")
          .map((cat) => cat.trim()),
        status: formData.get("status"),
        faq: [],
        internalLinks: [],
        externalLinks: [],
      });

      navigate("/blogs");
    } catch (error) {
      console.log(error);
      setError("Blog Create Failed");
    }
  };

  /* Preview Blog */
  const handlePreview = () => {
    const form = formRef.current;

    navigate("/blogs/preview", {
      state: {
        title: form.title.value,
        content: form.content.value,
        metaTitle: form.metaTitle.value,
        metaDescription: form.metaDescription.value,
        featureImage: form.featureImage.value,
        tags: form.tags.value,
        categories: form.categories.value,
        status: form.status.value,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <form
        ref={formRef}
        action={handleCreateBlog}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="content"
          placeholder="Blog Content"
          rows="6"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="metaDescription"
          placeholder="Meta Description"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="featureImage"
          placeholder="Feature Image URL"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="categories"
          placeholder="Categories (comma separated)"
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          defaultValue="Draft"
          className="w-full border p-3 rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <div className="flex gap-3">
          <SubmitButton />

          <button
            type="button"
            onClick={handlePreview}
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;