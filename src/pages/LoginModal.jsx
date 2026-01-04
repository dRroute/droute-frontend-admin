"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../redux/authThunk"
import { selectAuthErrorMessage } from "../redux/selector"

export default function LoginModal({ isOpen, onClose, onSwitchToForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch =useDispatch();
  const errorMessage =useSelector(selectAuthErrorMessage);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role:"admin"
  })

 const handleLogin = async (e) => {
  console.log("sign in data=>",loginData)
  e.preventDefault(); // prevent form from refreshing
  setIsLoading(true);
  try {
    const response = await dispatch(signIn(loginData));
    if (signIn.fulfilled.match(response)) {
      localStorage.setItem("user_id", String(response?.payload?.data?.userId));
      alert("Logged in successfully!");
      onClose(); // optionally close modal on success
    } else {
      alert(response?.payload?.message || errorMessage ||"Login failed");
    }
  } catch (e) {
    alert("Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        </div>

        <div className="space-y-4">
        
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
             
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* <div className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <button onClick={onSwitchToSignup} className="text-orange-500 hover:text-orange-600 transition-colors">
              Sign up
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
