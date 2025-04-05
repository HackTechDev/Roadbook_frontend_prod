import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateJourney from "./pages/CreateJourney";
import UpdateJourney from "./pages/UpdateJourney";
import JourneyDetail from "./pages/JourneyDetail";
import ChatWithMistral from "./pages/ChatWithMistral";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/" className="text-blue-500">Home</Link>&nbsp;
          <Link to="/create" className="text-green-500">Créer un voyage</Link>
          <Link to="/chat" className="text-green-500">Créer un voyage via AI</Link>

        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatWithMistral />} />
          <Route path="/create" element={<CreateJourney />} />
          <Route path="/update/:id" element={<UpdateJourney />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

