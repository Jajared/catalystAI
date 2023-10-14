import "./App.css";
import IRPage from "./pages/IRPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImpactPage from "./pages/ImpactPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IRPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
