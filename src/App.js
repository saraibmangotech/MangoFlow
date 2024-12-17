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
import Demo from './pages/Demo';

function App() {
  return (
    <div className="App">
     <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/graph" element={ <FlowGraph /> } />
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
