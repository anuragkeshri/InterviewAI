// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import InterviewHistory from "./pages/InterviewHistory";
// import MockInterview from "./pages/MockInterview";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//           <Route path="/history" element={<InterviewHistory />} />
//           <Route path="/mock-interview" element={<MockInterview />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import InterviewHistory from "./pages/InterviewHistory";
import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/history"
            element={<InterviewHistory />}
          />

          <Route
            path="/mock-interview"
            element={<MockInterview />}
          />

          <Route
            path="/resume-upload"
            element={<ResumeAnalyzer />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
