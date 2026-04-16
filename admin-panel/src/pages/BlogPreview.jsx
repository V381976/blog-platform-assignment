import { useLocation } from "react-router-dom";

const BlogPreview = () => {
  const { state } = useLocation();

  if (!state) {
    return <p>No Preview Data</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {state.featureImage && (
        <img
          src={state.featureImage}
          alt={state.title}
          className="w-full h-80 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">
        {state.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {state.metaDescription}
      </p>

      <div className="prose max-w-none">
        {state.content}
      </div>
    </div>
  );
};

export default BlogPreview;