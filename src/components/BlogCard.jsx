"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../app/utils/api";

const BlogCard = ({ blog, showActions = false, onUpdate, onDelete }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to save blogs");
        return;
      }

      if (isFavorited) {
        await api.delete(`/favorites/${blog._id}`);
        toast.success("Removed from favorites");
      } else {
        await api.post(`/favorites/${blog._id}`);
        toast.success("Added to favorites");
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      toast.error("Failed to update favorites");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      await api.delete(`/blogs/${blog._id}`);
      toast.success("Blog deleted successfully");
      if (onDelete) onDelete(blog._id);
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Blog Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={blog.image || "/placeholder-blog.jpg"}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {showActions && (
          <div className="absolute top-3 right-3 flex space-x-2">
            <Link
              href={`/dashboard/blogs/edit/${blog._id}`}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="p-6 bg-gradient-to-br from-white to-blue-50">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {blog.title}
          </h3>
          <button
            onClick={handleFavorite}
            disabled={isLoading}
            className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <svg
              className={`w-5 h-5 ${isFavorited ? "text-red-500 fill-current animate-pulse" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {blog.description || blog.content?.substring(0, 150) + "..."}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium">By {blog.author?.name || "Unknown"}</span>
            <span>•</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">{blog.views || 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/blogs/${blog._id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 hover:scale-105"
          >
            Read More →
          </Link>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">
                {blog.rating ? blog.rating.toFixed(1) : "0.0"}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({blog.comments?.length || 0} comments)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
