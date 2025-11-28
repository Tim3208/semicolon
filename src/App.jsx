import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import OrganizationPage from "./pages/OrganizationPage";
import StudentsPage from "./pages/StudentsPage";
import BudgetPage from "./pages/BudgetPage";
import GlobalStyle from "./style/globalstyle";

// 페이지 변경 시 자동 스크롤 상단 이동 컴포넌트
function ScrollToTop({ smooth = false }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // 라우트가 변경될 때마다 최상단 이동
    if (smooth) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);
  return null;
}

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop smooth={false} />
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<MainPage />} />
          {/* 학회 조직도 */}
          <Route path="/organization" element={<OrganizationPage />} />
          {/* 학생 조회 */}
          <Route path="/students" element={<StudentsPage />} />
          {/* 예산 관리 */}
          <Route path="/budget" element={<BudgetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
