import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import dynoLogo from "@/assets/images/dyno logo.png";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { signup, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if (isAuthenticated) {
        navigate("/dashboard");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await signup(username, email, password);
            navigate("/dashboard");
        } catch (err: any) {
            console.log(err);

            setError(err?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
            <div className="logo absolute top-8 left-8 text-center flex gap-2 items-center justify-center ">
                <img
                    src={dynoLogo}
                    alt="Dyno Logo"
                    className="h-10 w-auto mx-auto"
                />
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Sign up to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-zinc-500 text-xs">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-500 text-xs">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-zinc-500 text-xs">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-zinc-500 text-xs">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupPage;