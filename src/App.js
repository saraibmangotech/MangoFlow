import React from 'react';
import theme from "./Components/customTheme/CustomTheme"
import './styles.css';
import '@fontsource/noto-sans';
import { ThemeProvider } from "@emotion/react";

import FlowGraph from './Components/FlowGraph';
import Login from './pages/Login';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <BrowserRouter>
          <Routes>
            {/* Login Route */}
            <Route path="/" element={<Login />} />
            <Route path="/graph/:id" element={<FlowGraph />} />
            {/* Home Route */}
            <Route path="/home" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/templates" element={<Templates />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
