import Homepage from "./pages/Homepage";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signinpage from "./pages/Signinpage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import SignupPage from "./pages/Signuppage";
import RequiredAuth from "./components/RequiredAuth";
import RequiredTeam from "./components/RequiredTeam";
import { Dashboard } from "./pages/Dashboard";
import CreateTeamPage from "./pages/CreateTeamPage";
import { Toaster } from "./components/ui/sonner";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        {/* <Toaster /> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route
              path="/signup"
              element={
                !authUser ? <SignupPage /> : <Navigate to="/teams" replace />
              }
            />

            <Route
              path="/signin"
              element={
                !authUser ? <Signinpage /> : <Navigate to="/teams" replace />
              }
            />
{/* 
            <Route
              path="/teams"
              element={
                <RequiredAuth>
                  <CreateTeamPage />
                </RequiredAuth>
              }
            /> */}

            <Route path="/teams" element={<CreateTeamPage />} />

            {/* <Route
              path="/dashboard"
              element={
                <RequiredAuth>
                  <RequiredTeam>
                    <Dashboard />
                  </RequiredTeam>
                </RequiredAuth>
              }
            /> */}
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
