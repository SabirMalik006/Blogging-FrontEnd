"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogCard from "../../components/BlogCard";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blogs");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      router.push("/");
      toast.error("Access denied. Admin only.");
      return;
    }
    
    setUser(parsedUser);
    fetchData();
  }, []);

    const fetchData = async () => {
      try {
      setLoading(true);
      const [blogsResponse, usersResponse] = await Promise.all([
        api.get("/blogs"),
        api.get("/users")
      ]);
      
      setBlogs(blogsResponse.data.blogs || []);
      setUsers(usersResponse.data.users || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await api.delete(`/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchData(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage your blog platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{blogs.length}</div>
            <div className="text-gray-600">Total Blogs</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{users.length}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {blogs.reduce((acc, blog) => acc + (blog.comments?.length || 0), 0)}
            </div>
            <div className="text-gray-600">Total Comments</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {blogs.reduce((acc, blog) => acc + (blog.views || 0), 0)}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "blogs"
                  ? "bg-blue-600 text-white shadow-modern"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              📝 Blogs Management
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "users"
                  ? "bg-blue-600 text-white shadow-modern"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              👥 Users Management
            </button>
        <button
              onClick={() => setActiveTab("comments")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "comments"
                  ? "bg-blue-600 text-white shadow-modern"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              💬 Comments Management
        </button>
          </div>
        </div>

      {/* Content */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Blogs Management</h2>
              <Link
                href="/dashboard/blogs/create"
                className="btn-modern btn-primary"
              >
                ➕ Create New Blog
              </Link>
            </div>
            
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    showActions={true}
                    onDelete={handleDeleteBlog}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No blogs yet</h3>
                <p className="text-gray-500">Create your first blog to get started!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Users Management</h2>
            
            {users.length > 0 ? (
              <div className="card-modern overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "admin" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-green-100 text-green-800"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
        >
                              Delete
        </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500">Users will appear here once they register.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments Management</h2>
            
            <div className="space-y-4">
              {blogs.map((blog) => 
                blog.comments?.map((comment) => (
                  <div key={comment._id} className="card-modern p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-gray-900">
                            {comment.author?.name || "Anonymous"}
                          </span>
                          <span className="text-sm text-gray-500">
                            on "{blog.title}"
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                  <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-600 hover:text-red-800 transition-colors ml-4"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                  </button>
                </div>
              </div>
            ))
              )}
              
              {blogs.every(blog => !blog.comments?.length) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No comments yet</h3>
                  <p className="text-gray-500">Comments will appear here once users start commenting.</p>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
    </div>
  );
}
