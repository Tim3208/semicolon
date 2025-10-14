import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header, MobileMenu } from "./style";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Menu, X } from "lucide-react";

const MainLayOutHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { label: "홈", path: "/" },
    { label: "학회 조직도", path: "/organization" },
    { label: "학생 조회", path: "/students" },
    { label: "회의록", path: "/" },
    { label: "프로젝트", path: "/" },
  ];

  return (
    <>
      <Header className="backdrop-blur z-50">
        <nav className="h-16 max-w-1440 mx-auto flex justify-between items-center px-4">
          {/* 왼쪽 로고 */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <div className="text-primary text-2xl font-bold">semicolon;</div>
            </Link>

            {/* 데스크탑 메뉴 */}
            <ul className="hidden md:flex gap-8 font-medium text-sm">
              {navItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <li className="hover:text-primary cursor-pointer">
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* 우측 버튼 + 모바일 메뉴 버튼 */}
          <div className="flex items-center gap-2">
            {/* 모바일용 햄버거 */}
            <button
              className="md:hidden p-2"
              onClick={toggleMenu}
              aria-label="toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* 데스크탑용 버튼 */}
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm" className="gap-1">
                <LogIn size={16} />
                로그인
              </Button>
              <Button
                size="sm"
                className="bg-primary text-white hover:bg-primary/80 gap-1"
              >
                <UserPlus size={16} />
                회원가입
              </Button>
            </div>
          </div>
        </nav>
      </Header>

      {/* 모바일 메뉴 (햄버거 열림 시 표시) */}
      {menuOpen && (
        <MobileMenu>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.path} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-buttons">
            <Button variant="ghost" size="sm" className="gap-1 w-full">
              <LogIn size={16} />
              로그인
            </Button>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/80 gap-1 w-full"
            >
              <UserPlus size={16} />
              회원가입
            </Button>
          </div>
        </MobileMenu>
      )}
    </>
  );
};
export default MainLayOutHeader;
