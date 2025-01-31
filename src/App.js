import React from "react";
import theme from "./Components/customTheme/CustomTheme";
import "./styles.css";
import "@fontsource/noto-sans";
import { ThemeProvider } from "@emotion/react";

import FlowGraph from "./Components/FlowGraph";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Role from "./pages/Role";
import Templates from "./pages/Templates";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useProvideAuth";
import SignUp from "./pages/Signup";
import Demo from "./pages/Demo";

function App() {
  const { user } = useAuth();
  console.log("user==>", user);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/graph/:id" element={<FlowGraph />} />
            <Route path="/" element={<Demo />} />

            {/* Protected Routes */}
            {user && user?.token ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/role" element={<Role />} />
                <Route path="/templates" element={<Templates />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
