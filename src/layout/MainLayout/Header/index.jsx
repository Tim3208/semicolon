import { Button } from "@/components/ui/button";
import { Header } from "./style";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const MainLayOutHeader = () => {
  return (
    <>
      <Header className="bg-primary/5 backdrop-blur">
        <nav className="h-16 max-w-1440 mx-auto flex justify-between items-center">
          {/* 네비바 좌측 */}
          <div className="flex justify-between items-center gap-8">
            <Link to="/">
              <div className="text-primary text-2xl font-bold">semicolon;</div>
            </Link>
            <div>
              <ul className="flex gap-8 font-medium text-sm">
                <Link to="/">
                  <li className="hover:text-primary">홈</li>
                </Link>
                <Link to="/">
                  <li className="hover:text-primary">학회 조직도</li>
                </Link>
                <Link to="/">
                  <li className="hover:text-primary">회의록</li>
                </Link>
                <Link to="/">
                  <li className="hover:text-primary">프로젝트</li>
                </Link>
              </ul>
            </div>
          </div>
          {/* 우측 로그인&회원가입 */}
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <LogIn />
              로그인
            </Button>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/80"
            >
              <UserPlus />
              회원가입
            </Button>
          </div>
        </nav>
      </Header>
    </>
  );
};
export default MainLayOutHeader;
