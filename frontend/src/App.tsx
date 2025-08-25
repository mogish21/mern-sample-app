import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import InsurancePage from "./pages/InsurancePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/insurances" element={<InsurancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
