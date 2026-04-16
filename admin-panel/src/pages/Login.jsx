import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import { loginUser } from "../Services/authService";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <SubmitButton />
      </form>
    </div>
  );
};

export default Login;