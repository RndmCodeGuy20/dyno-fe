import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import dynoLogo from "@/assets/images/logo.png";

const LoginPage = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        navigate("/dashboard");
    }

    const from = location.state?.from?.pathname || "/dashboard";

    useEffect(() => {
        document.title = "Login - Dyno";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!identifier || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login(identifier, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err?.message || "Login failed. Please try again.");
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
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="identifier">Email or Username</Label>
                            <Input
                                id="identifier"
                                type="text"
                                placeholder="Enter your email or username"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                disabled={isLoading}
                                className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="text-sm px-2 py-0 border border-zinc-200 rounded-md bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-violet-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;