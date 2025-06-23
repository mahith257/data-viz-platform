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

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: #161618;
  border-top-left-radius: 5px;
  border-left: 1px solid #525252;
  border-top: 1px solid #525252;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #525252;
  border-radius: 5px;
  padding: 16px;
  background-color: #222324;

  ${MEDIA_QUERIES.belowMobile} {
    padding: 16px 5px;
  }
`;

const SelectContainer = styled.div`
  padding-right: 7px;
  border: 1px solid #5a5a5aa1;
  width: fit-content;
  border-radius: 5px;
  background-color: #18181a80;
  align-self: flex-end;

  ${MEDIA_QUERIES.belowDesktop} {
    max-width: 300px;
  }
`;

const GraphType = styled.select`
  border: none;
  background-color: transparent;
  padding: 10px 7px;
  color: #ffffff;
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

const GraphTypeOption = styled.option`
  color: #ffffff;
  background-color: #18181a80;
  padding: 8px;
  white-space: normal;
  word-wrap: break-word;
`;

const ChargingStations = () => {
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
      <Container>
        <Header>
          <HeaderLeft>
            <Lightning />
            <h1>Charging Station</h1>
          </HeaderLeft>
          <HeaderRight>
            <Button>
              <History />
            </Button>
            <Button onClick={handleEditVariables}>Edit Variables</Button>
            <Button>
              <Upload />
            </Button>
          </HeaderRight>
        </Header>
        <BestScenarioResults />
        <FlexContainer>
          <GraphsContainer>
            <h3>Graphs</h3>
            <GraphContainer>
              <SelectContainer>
                <GraphType
                  value={graphType}
                  onChange={(e) =>
                    handleGraphTypeChange(e.target.value as EGraphType)
                  }
                >
                  {GRAPH_TYPES.map((graph) => (
                    <GraphTypeOption value={graph.value} key={graph.value}>
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
