// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { MainLayOutFooterStyled } from "./style";

const MainLayOutFooter = () => {
  return (
    <MainLayOutFooterStyled className="flexBetweenCol">
      {/* 중앙 */}
      <div>
        {/* 상단 */}
        <div className="flexBetween">
          {/* 사이트정보 */}
          <div className="site-info">
            {/* title */}
            <h2>SEMICOLON</h2>
            {/* 설명 */}
            <p>2025 삼육대학교 컴퓨터공학부 학회 사이트입니다.</p>
          </div>

          {/* 목록 */}
          <nav className="flexBetween list">
            <ul>
              <li className="ul-title">서비스</li>
              <li>캘린더</li>
              <li>회의록</li>
              <li>예산 기록</li>
            </ul>
            <ul>
              <li className="ul-title">고객지원</li>
              <li>FAQ</li>
              <li>Q&A</li>
            </ul>
            <ul>
              <li className="ul-title">Front</li>
              <a href="https://github.com/Tim3208/semicolon">
                <li>박정우</li>
              </a>
              <a href="">
                <li></li>
              </a>
            </ul>
            <ul>
              <li className="ul-title">Back</li>
              <a href="https://github.com/Tim3208/semicolon">
                <li>박정우</li>
              </a>
              <a href="">
                <li></li>
              </a>
            </ul>
          </nav>
        </div>
        {/* 하단 */}
        <div className="bottom flexBetween flexHeightCenter">
          <span>© 2025 semicolon. All rights reserved.</span>
          <a href="https://github.com/Tim3208/semicolon" className="icon">
            {/* FIXME: 깃허브 아이콘 추가
            <FontAwesomeIcon icon={faGithub} /> */}
          </a>
        </div>
      </div>
    </MainLayOutFooterStyled>
  );
};
export default MainLayOutFooter;
