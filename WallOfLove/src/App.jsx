import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestimonialsPage from "./PublicTestimonials/TestimonialsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/space/:spaceId/widget" element={<TestimonialsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
