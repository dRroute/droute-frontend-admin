"use client"

import { useState } from "react"
import { Mail, ArrowLeft, CheckCircle, X } from "lucide-react"

export default function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
   // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Password reset request for:", email)
      setIsEmailSent(true)
    } catch (error) {
      alert("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsEmailSent(false)
    setEmail("")
    onClose()
  }

  const handleBackToLogin = () => {
    setIsEmailSent(false)
    setEmail("")
    onSwitchToLogin()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{isEmailSent ? "Check Your Email" : "Reset Password"}</h2>
        </div>

        <div className="space-y-4">
          {!isEmailSent ? (
            <>
              <div className="text-center text-sm text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="reset-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={handleBackToLogin}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Email Sent!</h3>
                  <p className="text-sm text-gray-600">
                    We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Try Different Email
                </button>

                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
