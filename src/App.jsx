import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Annonces from './pages/Annonces';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/annonces" element={<Annonces />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
