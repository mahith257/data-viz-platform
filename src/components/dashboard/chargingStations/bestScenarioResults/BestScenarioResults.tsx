import styled from "styled-components";
import AiGenerate from "../../../../assets/icons/AiGenerate";
import { BEST_SCENARIO_RESULTS } from "./constants";
import { GoKebabHorizontal } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector, type RootState } from "../../../../store";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#dafd7f")};
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#161618"};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FlexColumn = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
  transition: all 0.4s ease-in-out;

  animation: ${({ $isOpen }) =>
    $isOpen
      ? "slideInUp 0.4s ease-out forwards"
      : "slideOutDown 0.3s ease-in forwards"};

  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
`;

const BestScenarioResult = styled.div<{ theme: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#c9ff3b")};
  border-radius: 6px;
  border: 0.5px solid
    ${({ theme }) => (theme === "light" ? "#4caf50" : "#c8e972")};
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  transition: all 0.2s ease-in-out;
`;

const Kebab = styled(GoKebabHorizontal)<{ theme: string }>`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => (theme === "light" ? "#4caf50" : "#dafd7f")};
  }
`;

const ChevronContainer = styled.div<{ $isOpen: boolean; theme: string }>`
  cursor: pointer;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#4caf50" : "#c8e972")};
  border-radius: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 44px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? "rgba(76, 175, 80, 0.1)"
        : "rgba(200, 233, 114, 0.1)"};
    box-shadow: ${({ theme }) =>
      theme === "light"
        ? "0 0 10px rgba(76, 175, 80, 0.3)"
        : "0 0 10px rgba(200, 233, 114, 0.3)"};
  }

  svg {
    transition: transform 0.3s ease-in-out;
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;

const BestScenarioResults = () => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  const [showResults, setShowResults] = useState<boolean>(true);

  const handleShowResults = () => {
    setShowResults((prev) => !prev);
  };

  return (
    <Container theme={activeTheme}>
      <Header theme={activeTheme}>
        <HeaderLeft>
          <AiGenerate fill={activeTheme === "light" ? "#000000" : "#dafd7f"} />
          <h3>Best Scenario Results</h3>
        </HeaderLeft>
        <ChevronContainer
          $isOpen={showResults}
          theme={activeTheme}
          onClick={handleShowResults}
        >
          <FaChevronDown
            color={activeTheme === "light" ? "#4caf50" : "#c8e972"}
            size={16}
          />
        </ChevronContainer>
      </Header>

      <FlexColumn $isOpen={showResults}>
        {BEST_SCENARIO_RESULTS.map((result) => (
          <BestScenarioResult key={result} theme={activeTheme}>
            {result}
            <Kebab
              theme={activeTheme}
              color={activeTheme === "light" ? "#4caf50" : "#C9FF3B"}
              size={16}
            />
          </BestScenarioResult>
        ))}
      </FlexColumn>
    </Container>
  );
};

export default BestScenarioResults;
