"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import api from "./utils/api";
import toast from "react-hot-toast";

export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/blogs?limit=6&sort=-createdAt");
      setRecentBlogs(response.data.blogs || []);
      
      // Set the first blog as featured
      if (response.data.blogs && response.data.blogs.length > 0) {
        setFeaturedBlog(response.data.blogs[0]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                Welcome to <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">BlogSite</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover amazing stories, share your thoughts, and connect with a community of writers in our modern blogging platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/blogs"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚀 Explore Blogs
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ✨ Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blog */}
      {featuredBlog && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden">
                <img
                  src={featuredBlog.image || "/placeholder-blog.jpg"}
                  alt={featuredBlog.title}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="md:w-1/2 p-8 bg-gradient-to-br from-white to-blue-50">
                <div className="flex items-center mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    ⭐ Featured
                  </span>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                  {featuredBlog.title}
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {featuredBlog.description || featuredBlog.content?.substring(0, 200) + "..."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-medium">By {featuredBlog.author?.name || "Unknown"}</span>
                    <span>•</span>
                    <span>{new Date(featuredBlog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/blogs/${featuredBlog._id}`}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Blogs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Recent Blogs</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Discover the latest stories and insights from our amazing community of writers
          </p>
        </div>

        {recentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (
              <div key={blog._id} className="transform hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6 animate-bounce">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No blogs yet</h3>
            <p className="text-gray-500 text-lg">Be the first to share your amazing story!</p>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/blogs"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🌟 View All Blogs
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Community Stats</h2>
            <p className="text-white/80 text-xl">Join thousands of writers and readers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-bold text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">100+</div>
              <div className="text-white text-lg font-medium">Blogs Published</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">1K+</div>
              <div className="text-white text-lg font-medium">Active Readers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 group hover:bg-white/30 transition-all duration-300">
              <div className="text-5xl font-bold text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-white text-lg font-medium">Writers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
