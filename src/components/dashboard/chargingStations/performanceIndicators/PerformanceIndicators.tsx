import styled from "styled-components";
import { PERFORMANCE_INDICATORS } from "./constants";
import Help from "../../../../assets/icons/Help";
import Plus from "../../../../assets/icons/Plus";
import { Button } from "../../../../styles/shared";
import { MEDIA_QUERIES } from "../../../../styles/breakpoints";

const Container = styled.div`
  width: calc(40% - 25px);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;

  ${MEDIA_QUERIES.belowLarge} {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${MEDIA_QUERIES.belowMobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const IndicatorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  flex: 1;

  ${MEDIA_QUERIES.belowLarge} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${MEDIA_QUERIES.belowDesktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${MEDIA_QUERIES.belowMobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background-color: #222324;
  border-radius: 5px;
  border: 1px solid #525252;

  ${MEDIA_QUERIES.belowLarge} {
    width: 100%;
  }
`;

const IndicatorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IndicatorValue = styled.h1`
  margin-top: auto;
  align-self: flex-end;
`;

const IndicatorSubtitle = styled.p`
  font-size: 12px;
  line-height: 150%;
  font-weight: 300;
  color: #bbbbbb;
`;

const PerformanceIndicators = () => {
  return (
    <Container>
      <Header>
        <h3>Key Performance Indicators</h3>
        <Button>
          Variables
          <Plus />
        </Button>
      </Header>
      <IndicatorsContainer>
        {PERFORMANCE_INDICATORS.map((indicator) => (
          <IndicatorContainer key={indicator.title}>
            <IndicatorHeader>
              <h5>{indicator.title}</h5>
              <Help />
            </IndicatorHeader>
            <IndicatorSubtitle>{indicator.subtitle}</IndicatorSubtitle>
            <IndicatorValue>{indicator.value}</IndicatorValue>
          </IndicatorContainer>
        ))}
      </IndicatorsContainer>
    </Container>
  );
};

export default PerformanceIndicators;
