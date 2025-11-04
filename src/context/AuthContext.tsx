import { fetchUserProfile, login, register } from "@/services/authService";
import type { IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signup: (username: string, email: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem(TOKEN_KEY)
    );
    const [user, setUser] = useState<IUser | null>(() => {
        const stored = localStorage.getItem(USER_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    const queryClient = useQueryClient();

    // Fetch user profile when token exists
    const { data: profileData, isLoading: isProfileLoading } = useQuery({
        queryKey: ["user", token],
        queryFn: fetchUserProfile,
        enabled: !!token,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Sync user data from profile fetch
    useEffect(() => {
        if (profileData) {
            const userData: IUser = {
                id: profileData.id,
                username: profileData.username,
                email: profileData.email,
                createdAt: new Date(profileData.createdAt),
                updatedAt: new Date(profileData.updatedAt),
            };
            setUser(userData);
            localStorage.setItem(USER_KEY, JSON.stringify(userData));
        }
    }, [profileData]);

    // Signup mutation
    const signupMutation = useMutation({
        mutationFn: ({ username, email, password }: {
            username: string;
            email: string;
            password: string
        }) => register(email, username, password),
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem(TOKEN_KEY, data.token);
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Account created successfully");
        },
        onError: (error) => {
            toast.error(error?.message || "Signup failed");
        }
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: ({ username, password }: {
            username: string;
            password: string
        }) => login(username, password),
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem(TOKEN_KEY, data.token);
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Welcome back!");
        },
        onError: (error) => {
            toast.error(error?.message || "Login failed");
        }
    });

    // Logout handler
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        queryClient.clear();
        toast.success("Logged out successfully");
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading: isProfileLoading || signupMutation.isPending || loginMutation.isPending,
        signup: async (username, email, password) => {
            await signupMutation.mutateAsync({ username, email, password });
        },
        login: async (username, password) => {
            await loginMutation.mutateAsync({ username, password });
        },
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}