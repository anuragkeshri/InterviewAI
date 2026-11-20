import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import InterviewHistory from "./pages/InterviewHistory";
import MockInterview from "./pages/MockInterview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<InterviewHistory />} />
          <Route path="/mock-interview" element={<MockInterview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;