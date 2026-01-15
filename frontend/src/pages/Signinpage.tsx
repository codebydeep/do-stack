import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Signinpage = () => {
  const { signin, isSignin, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if(isLoggedIn){
        navigate("/main")
    }
  }, [isLoggedIn, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin(formData);
  };

  return (
    <>
      <div>
        <div className="flex min-h-screen">
          <div className="bg-fuchsia-800 w-1/2"></div>
          <div className="w-1/2">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
              <div className="w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">Create an Account ✨</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Register to get started
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      name="fullname"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSignin}
                    className={`w-full py-2 rounded-lg font-semibold transition duration-200 
            ${
              isSignin
                ? "bg-amber-300 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-500"
            }`}
                  >
                    {isSignin ? "Registering User..." : "Create Account"}
                  </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-amber-500 font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signinpage;
