import styled from "styled-components";

export const Card = styled.div`
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  background-color: var(--card);
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  //Profile
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  //Contact
  & > div:nth-child(4) {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }

  //Contact 내부 정보
  & > div > p {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  //이름
  .name {
    font-size: 1.5rem;
    font-weight: 700;
  }

  //직급 뱃지
  .position {
    background: ${(props) => {
      console.log(`프롭: ${props}, position: ${props.position}`);
      switch (props.position) {
        case "학회장":
          return "var(--primary)";
        default:
          return "var(--secondary)";
      }
    }};
    width: 360px;
    text-align: center;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-weight: 600;
  }

  //부서 뱃지
  .department {
    color: var(--gray-90);
    width: 360px;
    text-align: center;
    padding: 0.5rem 1rem;
    border: 1px solid var(--gray-70);
    border-radius: 1rem;
    font-weight: 400;
  }
`;
