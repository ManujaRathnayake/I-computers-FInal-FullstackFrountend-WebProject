import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
    FiMail,
    FiLock,
    FiUser,
    FiEye,
    FiEyeOff,
    FiArrowRight,
} from "react-icons/fi";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/users",
                {
                    email,
                    firstName,
                    lastName,
                    password,
                    confirmPassword,
                }
            );

            toast.success("Registration successful! Welcome aboard 🎉");

            navigate("/login");
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/login-bg.jpg"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/70" />
            </div>

            {/* Decorative Background Effects */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#8fa35c]/20 blur-3xl" />
            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Registration Form */}
            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6">

                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6d7c4a] shadow-lg">
                            <FiUser className="text-2xl text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-300">
                            Enter your details below to create your account.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Names */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    First Name
                                </label>

                                <div className="group relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    Last Name
                                </label>

                                <div className="group relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-200">
                                Email Address
                            </label>

                            <div className="group relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a9c46c]" />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-200">
                                Password
                            </label>

                            <div className="group relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a9c46c]" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimum 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-200">
                                Confirm Password
                            </label>

                            <div className="group relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#a9c46c]" />

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Repeat your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d7c4a] px-4 py-3.5 font-bold text-white shadow-lg shadow-[#6d7c4a]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#819257] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-[#a9c46c] transition hover:text-white hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}