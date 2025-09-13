"use client";
import { useState } from "react";
import api from "@/app/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
  
      // yahan backend se token uthao
      const token = res.data.token || res.data.accessToken;
  
      if (token) {
        localStorage.setItem("token", token); // token save
      }
  
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };
  

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 w-screen h-screen px-4">
      <div
        id="back-div"
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[16px] p-[2px] shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <div className="border-[6px] sm:border-[8px] border-transparent rounded-[14px] dark:bg-gray-900 bg-white shadow-lg w-full p-4 sm:p-6 md:p-8">
          <h1 className="pt-2 pb-4 font-bold text-2xl sm:text-3xl md:text-4xl dark:text-gray-400 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 text-white/80 text-lg">
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
                className="border  dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 text-white/80 text-lg">
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
                className="border  dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
              />
            </div>

            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white/80 rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
            >
              LOGIN
            </button>          </form>

          {/* Register Link */}
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3>
              <span className="cursor-default dark:text-gray-300">
                Don’t have an account?
              </span>
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="/register"
              >
                <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Register
                </span>
              </a>
            </h3>
          </div>

          {/* Third Party Auth */}
          <div
            id="third-party-auth"
            className="flex items-center justify-center mt-5 flex-wrap"
          >
            <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </button>
            <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                alt="Linkedin"
              />
            </button>
            <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                alt="Facebook"
              />
            </button>
          </div>

          {/* Terms & Privacy */}
          <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By logging in, you agree to our{" "}
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
