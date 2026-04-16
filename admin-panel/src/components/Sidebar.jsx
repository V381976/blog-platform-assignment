import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 min-h-screen bg-black text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      <div className="space-y-4">

        <Link to="/dashboard" className="block">
          Dashboard
        </Link>

        {(user.role === "Super Admin" ||
          user.role === "Editor" ||
          user.role === "Author") && (
          <Link to="/blogs" className="block">
            Blogs
          </Link>
        )}

        {user.role === "Super Admin" && (
          <Link to="/users" className="block">
            Users
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;