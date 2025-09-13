"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Registered successfully!");
      router.push("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
<div className="flex font-poppins items-center justify-center dark:bg-gray-900 w-screen min-h-screen px-4 py-6">
  <div
    id="back-div"
    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[16px] p-[2px] shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
  >
    <div className="border-[4px] sm:border-[6px] border-transparent rounded-[14px] dark:bg-gray-900 bg-white shadow-lg w-full p-4 sm:p-5 md:p-6">
      <h1 className="pt-1 pb-3 font-bold text-xl sm:text-2xl md:text-3xl dark:text-gray-400 text-center">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="mb-1 text-white/80 text-sm sm:text-base">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border dark:text-gray-300 dark:border-gray-700 p-2 sm:p-3 shadow-md placeholder:text-sm sm:placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 text-white/80 text-sm sm:text-base">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border dark:text-gray-300 dark:border-gray-700 p-2 sm:p-3 shadow-md placeholder:text-sm sm:placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1 text-white/80 text-sm sm:text-base">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border dark:text-gray-300 dark:border-gray-700 p-2 sm:p-3 mb-2 shadow-md placeholder:text-sm sm:placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-4 p-2 sm:p-3 text-white/80 rounded-lg w-full text-sm sm:text-base hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
        >
          REGISTER
        </button>
      </form>

      {/* Login Link */}
      <div className="flex flex-col mt-3 sm:mt-4 items-center justify-center text-xs sm:text-sm">
        <h3>
          <span className="cursor-default dark:text-gray-300">
            Already have an account?
          </span>
          <a
            className="group text-blue-400 transition-all duration-100 ease-in-out"
            href="/login"
          >
            <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Login
            </span>
          </a>
        </h3>
      </div>

      {/* Terms & Privacy */}
      <div className="text-gray-500 flex text-center flex-col mt-3 sm:mt-4 items-center text-xs sm:text-sm">
        <p className="cursor-default">
          By creating an account, you agree to our{" "}
          <a className="group text-blue-400 transition-all duration-100 ease-in-out">
            <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Terms
            </span>
          </a>{" "}
          and{" "}
          <a className="group text-blue-400 transition-all duration-100 ease-in-out">
            <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Privacy Policy
            </span>
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  );
}
