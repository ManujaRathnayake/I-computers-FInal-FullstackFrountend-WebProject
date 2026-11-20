import { useState } from "react";
import api from "../utils/Api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import {
    FiMail,
    FiLock,
    FiKey,
    FiArrowLeft,
    FiShield,
    FiEye,
    FiEyeOff,
} from "react-icons/fi";

export default function ForgetPassword() {

    const [isEmailsent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // SEND OTP TO EMAIL
    async function sendEmail(e) {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setLoading(true);

            await api.post("/users/send-otp", {
                email: email.trim(),
            });

            setIsEmailSent(true);

            toast.success("OTP sent to your email!");

        } catch (error) {
            console.error("Send OTP Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to send OTP. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    // RESET PASSWORD
    async function Resetpassword(e) {
        e.preventDefault();

        if (!OTP || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must contain at least 8 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await api.post("/users/verify-otp", {
                email: email.trim(),
                otp: OTP.trim(),
                newPassword: newPassword,
            });

            toast.success("Password reset successfully!");

            setIsEmailSent(false);

            navigate("/login", { replace: true });

        } catch (error) {
            console.error("Reset Password Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to reset password. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">

            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">

                <img
                    src="/login-bg.jpg"
                    alt="Background"
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-slate-950/80" />

            </div>

            {/* DECORATIVE BACKGROUND */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#8fa35c]/20 blur-3xl" />

            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            {/* MAIN CONTAINER */}
            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10">

                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-2xl sm:p-9">

                    {/* HEADER ICON */}
                    <div className="mb-6 flex justify-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6d7c4a] shadow-lg shadow-[#6d7c4a]/30">

                            {isEmailsent ? (
                                <FiShield className="text-3xl text-white" />
                            ) : (
                                <FiKey className="text-3xl text-white" />
                            )}

                        </div>

                    </div>

                    {/* HEADING */}
                    <div className="mb-8 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-white">

                            {isEmailsent
                                ? "Reset Your Password"
                                : "Forgot Password?"
                            }

                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-300">

                            {isEmailsent
                                ? "Enter the verification code sent to your email and create a new password."
                                : "Don't worry! Enter your registered email address and we'll help you reset your password."
                            }

                        </p>

                    </div>

                    {/* STEP 1 - EMAIL */}
                    {!isEmailsent && (

                        <form onSubmit={sendEmail} className="space-y-5">

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    Email Address
                                </label>

                                <div className="group relative">

                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#a9c46c] focus:bg-white/15 focus:ring-2 focus:ring-[#a9c46c]/20 disabled:opacity-60"
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d7c4a] px-4 py-3.5 font-bold text-white shadow-lg shadow-[#6d7c4a]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#819257] disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Sending OTP...
                                    </>
                                ) : (
                                    <>
                                        Send Verification Code
                                        <FiMail />
                                    </>
                                )}

                            </button>

                        </form>

                    )}

                    {/* STEP 2 - VERIFY OTP AND RESET PASSWORD */}
                    {isEmailsent && (

                        <form onSubmit={Resetpassword} className="space-y-5">

                            {/* EMAIL INFORMATION */}
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">

                                <p className="text-xs text-gray-400">
                                    Verification code sent to
                                </p>

                                <p className="mt-1 break-all text-sm font-semibold text-white">
                                    {email}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setIsEmailSent(false)}
                                    className="mt-2 text-xs font-semibold text-[#a9c46c] hover:text-white"
                                >
                                    Change email address
                                </button>

                            </div>

                            {/* OTP */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    Verification Code
                                </label>

                                <div className="group relative">

                                    <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type="text"
                                        placeholder="Enter your OTP"
                                        value={OTP}
                                        onChange={(e) => setOTP(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-4 text-sm tracking-widest text-white outline-none placeholder:text-gray-500 placeholder:tracking-normal focus:border-[#a9c46c] focus:ring-2 focus:ring-[#a9c46c]/20"
                                    />

                                </div>

                            </div>

                            {/* NEW PASSWORD */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    New Password
                                </label>

                                <div className="group relative">

                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a9c46c] focus:ring-2 focus:ring-[#a9c46c]/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>

                                </div>

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-200">
                                    Confirm New Password
                                </label>

                                <div className="group relative">

                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#a9c46c]" />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#a9c46c] focus:ring-2 focus:ring-[#a9c46c]/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>

                                </div>

                            </div>

                            {/* RESET BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d7c4a] px-4 py-3.5 font-bold text-white shadow-lg shadow-[#6d7c4a]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#819257] disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Resetting Password...
                                    </>
                                ) : (
                                    <>
                                        Reset Password
                                        <FiLock className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}

                            </button>

                        </form>

                    )}

                    {/* BACK TO LOGIN */}
                    <div className="mt-8 border-t border-white/10 pt-6">

                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 text-sm font-semibold text-[#a9c46c] transition hover:text-white"
                        >

                            <FiArrowLeft />

                            Back to Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}