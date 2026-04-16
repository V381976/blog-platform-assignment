import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../Services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      const user = users.find((u) => u._id === id);

      await updateUser(id, {
        role,
        status: user.status,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const user = users.find((u) => u._id === id);

      await updateUser(id, {
        role: user.role,
        status,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p>{user.email}</p>
            </div>

            <div className="flex gap-3">

              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user._id, e.target.value)
                }
                className="border p-2 rounded"
              >
                <option>Super Admin</option>
                <option>Editor</option>
                <option>Author</option>
                <option>Viewer</option>
              </select>

              <select
                value={user.status}
                onChange={(e) =>
                  handleStatusChange(user._id, e.target.value)
                }
                className="border p-2 rounded"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
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

export default UserManagement;