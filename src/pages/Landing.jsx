"use client";

import { useState } from "react";
import { Truck, Clock, Shield, Star, MapPin, Phone } from "lucide-react";
import LoginModal from "./LoginModal";
// import SignupModal from "./SignupModal"
import ForgotPasswordModal from "./ForgotPasswordModal";
import whiteLogo from "../assets/transparentIcon.png";
export default function Landing() {
  const [activeModal, setActiveModal] = useState(null); // 'login', 'signup', 'forgot-password', or null

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <a
          href="/"
          className="flex items-center justify-center focus:outline-none"
        >
          <img src={whiteLogo} alt="Droute Logo" className="h-8 invert" />
        </a>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            onClick={() => openModal("login")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </nav>
      </header>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        // onSwitchToSignup={() => openModal("signup")}
        onSwitchToForgotPassword={() => openModal("forgot-password")}
      />

      {/* <SignupModal isOpen={activeModal === "signup"} onClose={closeModal} onSwitchToLogin={() => openModal("login")} /> */}

      <ForgotPasswordModal
        isOpen={activeModal === "forgot-password"}
        onClose={closeModal}
        onSwitchToLogin={() => openModal("login")}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Fast & Reliable Delivery
                    <span className="text-orange-500"> Anywhere</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Get your packages delivered quickly and safely. Same-day
                    delivery available in most areas. Track your orders in
                    real-time with our advanced logistics system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
                    Get Started
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9/5</span>
                  </div>
                  <span>•</span>
                  <span>1000+ Happy Customers</span>
                  <span>•</span>
                  <span>Collaborative Booking</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/deliveryman.jpg?height=400&width=400"
                  width="400"
                  height="400"
                  alt="Delivery truck illustration"
                  className="aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="services" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-800">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose Droute?
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  We provide fast, secure, and reliable delivery services with
                  real-time tracking and 24/7 customer support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center space-y-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-center text-gray-600">
                  Same-day and next-day delivery options available. Get your
                  packages when you need them.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center space-y-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Secure & Safe</h3>
                <p className="text-center text-gray-600">
                  Your packages are insured and handled with care. Real-time
                  tracking for complete transparency.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-center space-y-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Wide Coverage</h3>
                <p className="text-center text-gray-600">
                  Delivering to over 500 cities nationwide. Local and
                  long-distance delivery services available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500">
                  50K+
                </div>
                <div className="text-sm text-gray-600">
                  Deliveries Completed
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500">
                  500+
                </div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500">
                  99.9%
                </div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Simple steps to get your package delivered quickly and safely.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold">Book Online</h3>
                <p className="text-gray-600">
                  Schedule your pickup online or through our mobile app. Choose
                  your delivery speed and get instant pricing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold">We Pickup</h3>
                <p className="text-gray-600">
                  Our driver arrives at your location to collect the package. No
                  need to wait around - we work with your schedule.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-gray-600">
                  Track your package in real-time as we deliver it safely to the
                  destination. Get notifications every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-500">
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                Ready to Ship Your Package?
              </h2>
              <p className="max-w-[600px] text-orange-100 md:text-xl">
                Get started today and experience the fastest, most reliable
                delivery service in your area.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <button className="bg-white text-orange-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
                Download App
              </button>
              {/* <button className="border border-white text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-orange-500 transition-colors">
                Get Quote
              </button> */}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Stay Updated
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                Subscribe to get delivery updates, special offers, and shipping
                tips delivered to your inbox.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              {/* <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form> */}
              {/* <p className="text-xs text-gray-600">
                {"By subscribing, you agree to our "}
                <a href="/privacy" className="underline underline-offset-2 text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </a>
              </p> */}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-orange-500" />
          <p className="text-xs text-gray-600">
            © 2024 Droute. All rights reserved.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs hover:underline underline-offset-4 flex items-center gap-1 text-gray-600"
          >
            <Phone className="h-3 w-3" />
            Support
          </a>
        </nav>
      </footer>
    </div>
  );
}
