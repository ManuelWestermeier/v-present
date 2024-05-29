import { Navigate, Route, Routes } from "react-router-dom";
import SetPageUrlPage from "./pages/set-url-page";
import Presentation from "./pages/presentation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetPageUrlPage />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
