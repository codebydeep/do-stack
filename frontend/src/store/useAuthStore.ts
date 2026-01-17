type SignUpData = {
  fullname: string;
  email: string;
  password: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isSignup: boolean;
  isSignin: boolean;
  isCheckAuth: boolean;

  signup: (data: SignUpData) => Promise<boolean>;
  signin: (data: SignInData) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSignup: false,
  isSignin: false,
  isCheckAuth: false,

  // SIGNUP
  signup: async (data): Promise<boolean> => {
    set({ isSignup: true });

    try {
      const res = await axiosInstance.post<{ user: AuthUser }>(
        "/user/auth/register",
        data,
        { withCredentials: true }
      );

      set({
        authUser: res.data.user,
        isSignup: false,
      });

      toast.success("User signed up successfully");

      return true;
    } catch (error) {
      console.error("Signup error", error);
      set({ isSignup: false });
      toast.error("Signup failed");
      return false;
    }
  },

  // SIGNIN
  signin: async (data) => {
    set({ isSignin: true });

    try {
      const res = await axiosInstance.post<{ user: AuthUser }>(
        "/user/auth/login",
        data,
        { withCredentials: true }
      );

      set({
        authUser: res.data.user,
        isSignin: false,
      });

      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Signin error", error);
      set({ isSignin: false });
      toast.error("Login failed");
    }
  },

  // CHECK AUTH
  checkAuth: async () => {
    set({ isCheckAuth: true });

    try {
      const res = await axiosInstance.get<{ user: AuthUser }>("/user/auth/me", {
        withCredentials: true,
      });

      set({
        authUser: res.data.user,
        isCheckAuth: false,
      });
    } catch {
      set({
        authUser: null,
        isCheckAuth: false,
      });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await axiosInstance.get(
        "/user/auth/logout",
        { withCredentials: true }
      );

      // set({
      //   authUser: null,
      // });

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
      // toast.error("Logout failed");
    } finally {
      set({ authUser: null });
      // toast.success("Logged out successfully");
    }
  },
}));

export default useAuthStore;
