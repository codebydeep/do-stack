import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"
import { AxiosError } from "axios"

type SignInData = {
  email: string
  password: string
}

type AuthUser = {
  id: string
  email: string
  name?: string
}

type AuthStore = {
  authUser: AuthUser | null
  isSignin: boolean
  isLoggedIn: boolean
  isCheckAuth: boolean

  signin: (data: SignInData) => Promise<void>
  login: (data: SignInData) => Promise<void>
  checkAuth: () => Promise<void>
}


export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSignin: false,
  isLoggedIn: false,
  isCheckAuth: true,

  /* ---------- REGISTER ---------- */
  signin: async (data) => {
    set({ isSignin: true })

    try {
      const res = await axiosInstance.post<{ user: AuthUser }>(
        "/user/auth/register",
        data,
        { withCredentials: true }
      )

      set({
        authUser: res.data.user,
        isSignin: true,
      })

      toast.success("User signed in successfully")
    } catch (error) {
      const err = error as AxiosError
      console.error("Signin error:", err.message)

      set({ isSignin: false })
      toast.error("Error signing in user!")
    }
  },

  /* ---------- LOGIN ---------- */
  login: async (data) => {
    try {
      const res = await axiosInstance.post<{ user: AuthUser }>(
        "/auth/login",
        data,
        { withCredentials: true }
      )

      set({
        authUser: res.data.user,
        isLoggedIn: true,
      })

      toast.success("User logged in successfully")
    } catch (error) {
      console.error("Error logging in:", error)
      toast.error("Error logging in user!")
    }
  },

  /* ---------- CHECK AUTH ---------- */
  checkAuth: async () => {
    set({ isCheckAuth: true })

    try {
      const res = await axiosInstance.get<{ user: AuthUser }>(
        "/auth/get-user",
        { withCredentials: true }
      )

      set({
        authUser: res.data.user,
        isLoggedIn: true,
      })
    } catch (error) {
      console.error("Check auth error:", error)
      set({
        authUser: null,
        isLoggedIn: false,
      })
    } finally {
      set({ isCheckAuth: false })
    }
  },
}))
