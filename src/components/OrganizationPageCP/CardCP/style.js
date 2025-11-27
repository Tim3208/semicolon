import styled from "styled-components";

export const Card = styled.div`
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px -10px rgba(243, 115, 53, 0.15);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(253, 200, 48, 0.2);
  height: 480px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -10px rgba(243, 115, 53, 0.25);
    border-color: #fdc830;
  }

  //Profile
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  //Contact
  & > div:nth-child(4) {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.8rem;
    background: rgba(255, 247, 224, 0.5);
    padding: 1rem;
    border-radius: 12px;
  }

  //Contact 내부 정보
  & > div > p {
    width: 100%;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    font-size: 0.9rem;
    color: #555;

    svg {
      color: #f37335;
      width: 18px;
      height: 18px;
    }
  }

  //이름
  .name {
    font-size: 1.8rem;
    font-weight: 800;
    color: #333;
    background: #f37335;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  //직급 뱃지
  .position {
    background: ${(props) =>
      props.position === "학회장" ||
      (props.position && props.position.endsWith("부장"))
        ? "linear-gradient(135deg, #FDC830 0%, #F37335 100%)"
        : "#F37335"};
    color: white;
    padding: 0.4rem 1.2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    width: auto;
    min-width: 100px;
    text-align: center;
  }

  //부서
  .department {
    font-size: 0.9rem;
    color: #888;
    font-weight: 500;
    border: 1px solid #fdc830;
    padding: 0.3rem 1rem;
    border-radius: 50px;
    background: rgba(255, 247, 224, 0.5);
    width: auto;
    min-width: 100px;
    text-align: center;
  }

  //소개글
  & > p {
    text-align: center;
    color: #666;
    line-height: 1.5;
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
  }
`;
