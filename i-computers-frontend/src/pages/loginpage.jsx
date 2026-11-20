
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiLogIn,
} from "react-icons/fi";

import api from "../utils/Api.js";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const navigate = useNavigate();

    // Redirect after successful login
    function handleRedirect(isAdmin) {
        if (isAdmin === true) {
            navigate("/admin", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }

    // NORMAL EMAIL AND PASSWORD LOGIN
    async function handleLogin(e) {
        e.preventDefault();

        if (!email.trim() || !password) {
            toast.error("Please enter your email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/users/login", {
                email: email.trim(),
                password: password,
            });

            if (!response.data.token) {
                toast.error("Login failed. Authentication token missing.");
                return;
            }

            // Save token before redirecting
            localStorage.setItem("token", response.data.token);

            toast.success("Login Successful!");

            handleRedirect(response.data.isAdmin);

        } catch (error) {
            console.error("Login Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to login. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    // GOOGLE LOGIN
    const googleLogin = useGoogleLogin({

        onSuccess: async (googleResponse) => {

            try {
                setGoogleLoading(true);

                const response = await api.post("/users/google-login", {
                    token: googleResponse.access_token,
                });

                if (!response.data.token) {
                    toast.error("Google login failed. Token missing.");
                    return;
                }

                // Save token
                localStorage.setItem("token", response.data.token);

                toast.success("Google Login Successful!");

                handleRedirect(response.data.isAdmin);

            } catch (error) {

                console.error("Google Login Error:", error);

                toast.error(
                    error.response?.data?.message ||
                    "Google login failed!"
                );

            } finally {
                setGoogleLoading(false);
            }
        },

        onError: () => {
            toast.error("Google login failed!");
        },
    });

    return (

        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">

            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">

                <img
                    src="/login-bg.jpg"
                    alt="Login background"
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-slate-950/75" />

            </div>

            {/* DECORATIVE BACKGROUND ELEMENTS */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#8fa35c]/20 blur-3xl" />

            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            {/* LOGIN CONTAINER */}
            <div className="relative z-10 flex min-h-screen w-full items-center justify-end px-4 py-8 sm:px-10 lg:px-20">

                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

                    {/* HEADER */}
                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6d7c4a] shadow-lg shadow-[#6d7c4a]/30">

                            <FiLogIn className="text-2xl text-white" />

                        </div>

                        <h1 className="text-3xl font-bold text-white">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-300">
                            Sign in to continue to your account.
                        </p>

                    </div>

                    {/* LOGIN FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* EMAIL */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-200">
                                Email Address
                            </label>

                            <div className="group relative">

                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition duration-200 focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20 disabled:opacity-60"
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label className="block text-sm font-medium text-gray-200">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-medium text-[#a9c46c] transition hover:text-white hover:underline"
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <div className="group relative">

                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 transition duration-200 focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20 disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                                >
                                    {showPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d7c4a] px-4 py-3.5 font-bold text-white shadow-lg shadow-[#6d7c4a]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#819257] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <FiLogIn className="transition-transform duration-300 group-hover:translate-x-1" />
                                </>
                            )}

                        </button>

                    </form>

                    {/* DIVIDER */}
                    <div className="flex items-center gap-4 py-5">

                        <div className="h-px flex-1 bg-white/10" />

                        <span className="text-xs text-gray-400">
                            OR CONTINUE WITH
                        </span>

                        <div className="h-px flex-1 bg-white/10" />

                    </div>

                    {/* GOOGLE LOGIN BUTTON */}
                    <button
                        type="button"
                        onClick={() => googleLogin()}
                        disabled={googleLoading || loading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {googleLoading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Connecting...
                            </>
                        ) : (
                            <>
                                <FcGoogle className="text-xl" />
                                Continue with Google
                            </>
                        )}

                    </button>

                    {/* REGISTER LINK */}
                    <p className="mt-7 text-center text-sm text-gray-300">

                        Don't have an account?{" "}

                        <Link
                            to="/Register"
                            className="font-bold text-[#a9c46c] transition hover:text-white hover:underline"
                        >
                            Create an account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}
