import styled from "styled-components";
import { PERFORMANCE_INDICATORS } from "./constants";
import Help from "../../../../assets/icons/Help";
import Plus from "../../../../assets/icons/Plus";
import { Button } from "../../../../styles/shared";
import { MEDIA_QUERIES } from "../../../../styles/breakpoints";
import { useAppSelector, type RootState } from "../../../../store";

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

const IndicatorContainer = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f5f5f5" : "#222324"};
  border-radius: 5px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};

  ${MEDIA_QUERIES.belowLarge} {
    width: 100%;
  }
`;

const IndicatorHeader = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const IndicatorValue = styled.h1<{ theme: string }>`
  margin-top: auto;
  align-self: flex-end;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const IndicatorSubtitle = styled.p<{ theme: string }>`
  font-size: 12px;
  line-height: 150%;
  font-weight: 300;
  color: ${({ theme }) => (theme === "light" ? "#666666" : "#bbbbbb")};
`;

const PerformanceIndicators = () => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <Container>
      <Header>
        <h3 style={{ color: activeTheme === "light" ? "#000000" : "#ffffff" }}>
          Key Performance Indicators
        </h3>
        <Button theme={activeTheme}>
          Variables
          <Plus />
        </Button>
      </Header>
      <IndicatorsContainer>
        {PERFORMANCE_INDICATORS.map((indicator) => (
          <IndicatorContainer key={indicator.title} theme={activeTheme}>
            <IndicatorHeader theme={activeTheme}>
              <h5>{indicator.title}</h5>
              <Help />
            </IndicatorHeader>
            <IndicatorSubtitle theme={activeTheme}>
              {indicator.subtitle}
            </IndicatorSubtitle>
            <IndicatorValue theme={activeTheme}>
              {indicator.value}
            </IndicatorValue>
          </IndicatorContainer>
        ))}
      </IndicatorsContainer>
    </Container>
  );
};

export default PerformanceIndicators;
