import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold">
          Welcome {user.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Role: {user.role}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;