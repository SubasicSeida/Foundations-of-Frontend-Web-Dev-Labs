import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "/pages/Home";

function App() {
  return (
    <Router>
      <Navbar /> // this is how the components are being called
      <div className="container">
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;