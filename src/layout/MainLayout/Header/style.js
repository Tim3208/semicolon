import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: 1px solid var(--gray-70);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  z-index: 50;
`;

// 모바일 메뉴 슬라이드
export const MobileMenu = styled.div`
  position: fixed;
  top: 64px; /* 헤더 높이만큼 아래 */
  left: 0;
  width: 100%;
  height: calc(100vh - 64px);
  background: white;
  border-top: 1px solid var(--gray-70);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 40;
  animation: slideDown 0.2s ease-out;

  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 1rem;
    font-weight: 500;
  }

  li {
    cursor: pointer;
    transition: color 0.2s;
  }

  li:hover {
    color: var(--primary);
  }

  .menu-buttons {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* PC 화면에서는 숨기기 */
  @media (min-width: 768px) {
    display: none;
  }
`;
