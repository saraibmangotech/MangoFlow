import React from 'react';

import './styles.css';
import FlowGraph from './Components/FlowGraph';
import Login from './pages/Login';
import Home from './pages/Home';
import Select from './pages/Select';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/graph" element={ <FlowGraph /> } />
        {/* Home Route */}
        <Route path="/home" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/templates" element={<Templates />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
