"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/utils/api";
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch user and blogs after login
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await api.get("/auth/me"); // backend me /me API honi chahiye
        setUser(resUser.data);

        const resBlogs = await api.get("/blogs");
        setBlogs(resBlogs.data);
      } catch (err) {
        toast.error("Please login first!");
        router.push("/login");
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200">Blog Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="p-6">
        {user && (
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
            Welcome, {user.name} 👋
          </h2>
        )}

        <button
          onClick={() => router.push("/blogs/create")}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          ➕ Add New Blog
        </button>

        {/* Blog List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(blog.createdAt).toDateString()}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => router.push(`/blogs/edit/${blog._id}`)}
                    className="px-3 py-1 bg-yellow-400 text-sm rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => router.push(`/blogs/${blog._id}`)}
                    className="px-3 py-1 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No blogs yet. Start by adding one!</p>
          )}
        </div>
      </main>
    </div>
  );
}
