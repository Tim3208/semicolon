import styled from "styled-components";

// Emotional Design Constants
const MAIN_COLOR = "#d97706"; // Amber-600
const BG_COLOR = "#fffbeb"; // Amber-50
const TEXT_COLOR = "#78350f"; // Amber-900

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${BG_COLOR};
  color: ${TEXT_COLOR};
  font-family: "Pretendard", sans-serif;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${MAIN_COLOR};
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(217, 119, 6, 0.1);
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${TEXT_COLOR};
  opacity: 0.8;
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BudgetDisplay = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(217, 119, 6, 0.1),
    0 4px 6px -2px rgba(217, 119, 6, 0.05);
  text-align: center;
  border: 1px solid #fcd34d;
`;

export const Amount = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: ${MAIN_COLOR};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${TEXT_COLOR};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ExpenditureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExpenditureItem = styled.li`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #fde68a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const SimulationSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
`;
