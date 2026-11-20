import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import AdminPage from "./pages/adminPage";
import Testpage from "./test";
import LoginPage from "./pages/loginpage";
import { Toaster } from "react-hot-toast";
import AdmineditProductPage from "./pages/admin/adminEditProductPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPassword from "./pages/forgetPassword";
//204002926070-t0mr6k1g3fck8jov29ggklevss1nnilk.apps.googleusercontent.com

function App() {
  return (
    <GoogleOAuthProvider clientId="204002926070-t0mr6k1g3fck8jov29ggklevss1nnilk.apps.googleusercontent.com">
      <div className="w-full h-screen flex justify-center items-center bg-primary text-secondary">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/admin/*" element={<AdminPage />} />

          <Route path="/test" element={<Testpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
