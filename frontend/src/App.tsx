import Homepage from "./pages/Homepage";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signinpage from "./pages/Signinpage";
import Mainpage from "./pages/Mainpage";
import Signuppage from "./pages/Signuppage";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<Signinpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Homepage /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
