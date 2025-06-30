import styled from "styled-components";
import Lightning from "../../../assets/icons/Lightning";
import Upload from "../../../assets/icons/Upload";
import History from "../../../assets/icons/History";
import { GRAPH_TYPES, GRAPH_TYPES_MAP } from "./constants";
import { useState } from "react";
import { EGraphType } from "./types";
import PerformanceIndicators from "./performanceIndicators/PerformanceIndicators";
import BestScenarioResults from "./bestScenarioResults/BestScenarioResults";
import EditVariablesDrawer from "./editVariablesDrawer/EditVariablesDrawer";
import { Button } from "../../../styles/shared";
import { MEDIA_QUERIES } from "../../../styles/breakpoints";
import { useAppSelector, type RootState } from "../../../store";

const Container = styled.div<{ theme: string }>`
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#161618"};
  border-top-left-radius: 5px;
  border-left: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  border-top: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  transition: background-color 0.3s ease, color 0.3s ease;

  ${MEDIA_QUERIES.belowDesktop} {
    padding: 20px;
  }

  ${MEDIA_QUERIES.belowMobile} {
    padding: 16px;
  }
`;

const Header = styled.div<{ theme: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#161618"};

  ${MEDIA_QUERIES.belowTablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 25px;

  ${MEDIA_QUERIES.belowLarge} {
    flex-direction: column;
  }
`;

const GraphsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  height: 100%;

  ${MEDIA_QUERIES.belowLarge} {
    width: 100%;
  }
`;

const GraphContainer = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  border-radius: 5px;
  padding: 16px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#222324"};

  ${MEDIA_QUERIES.belowMobile} {
    padding: 16px 5px;
  }
`;

const SelectContainer = styled.div<{ theme: string }>`
  padding-right: 7px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#5a5a5aa1")};
  width: fit-content;
  border-radius: 5px;
  background-color: ${({ theme }) =>
    theme === "light" ? "rgba(200, 200, 200, 0.5)" : "#18181a80"};
  align-self: flex-end;

  ${MEDIA_QUERIES.belowDesktop} {
    max-width: 300px;
  }
`;

const GraphType = styled.select<{ theme: string }>`
  border: none;
  background-color: transparent;
  padding: 10px 7px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  outline: none;

  ${MEDIA_QUERIES.belowDesktop} {
    width: 100%;
    min-width: 0;
  }
`;

const GraphTypeOption = styled.option<{ theme: string }>`
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  background-color: ${({ theme }) =>
    theme === "light" ? "#ffffff" : "#18181a80"};
  padding: 8px;
  white-space: normal;
  word-wrap: break-word;
`;

const ChargingStations = () => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  const [isEditVariablesDrawerOpen, setIsEditVariablesDrawerOpen] =
    useState<boolean>(false);
  const [graphType, setGraphType] = useState<EGraphType>(
    EGraphType.UNSATISFIED_DEMAND
  );

  const handleEditVariables = () => {
    setIsEditVariablesDrawerOpen(true);
  };

  const handleEditVariablesClose = () => {
    setIsEditVariablesDrawerOpen(false);
  };

  const handleGraphTypeChange = (value: EGraphType) => {
    setGraphType(value);
  };

  return (
    <>
      <Container theme={activeTheme}>
        <Header theme={activeTheme}>
          <HeaderLeft>
            <Lightning />
            <h1>Charging Station</h1>
          </HeaderLeft>
          <HeaderRight>
            <Button theme={activeTheme}>
              <History />
            </Button>
            <Button theme={activeTheme} onClick={handleEditVariables}>
              Edit Variables
            </Button>
            <Button theme={activeTheme}>
              <Upload />
            </Button>
          </HeaderRight>
        </Header>
        <BestScenarioResults />
        <FlexContainer>
          <GraphsContainer>
            <h3
              style={{ color: activeTheme === "light" ? "#000000" : "#ffffff" }}
            >
              Graphs
            </h3>
            <GraphContainer theme={activeTheme}>
              <SelectContainer theme={activeTheme}>
                <GraphType
                  theme={activeTheme}
                  value={graphType}
                  onChange={(e) =>
                    handleGraphTypeChange(e.target.value as EGraphType)
                  }
                >
                  {GRAPH_TYPES.map((graph) => (
                    <GraphTypeOption
                      theme={activeTheme}
                      value={graph.value}
                      key={graph.value}
                    >
                      {graph.label}
                    </GraphTypeOption>
                  ))}
                </GraphType>
              </SelectContainer>
              {GRAPH_TYPES_MAP[graphType]}
            </GraphContainer>
          </GraphsContainer>
          <PerformanceIndicators />
        </FlexContainer>
      </Container>
      {isEditVariablesDrawerOpen && (
        <EditVariablesDrawer onClose={handleEditVariablesClose} />
      )}
    </>
  );
};

export default ChargingStations;
