import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OrganizationPage from "./pages/OrganizationPage";
import StudentsPage from "./pages/StudentsPage";
import GlobalStyle from "./style/globalstyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<MainPage />} />

          {/* 학회 조직도 */}
          <Route path="/organization" element={<OrganizationPage />} />

          {/* 학생 조회 */}
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
