import { Navigate, Route, Routes } from "react-router-dom";
import Presentation from "./pages/presentation";
import Project from "./pages/project";
import HomePage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/project/:index" element={<Project />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
