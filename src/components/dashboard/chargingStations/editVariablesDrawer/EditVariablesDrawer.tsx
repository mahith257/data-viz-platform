import styled, { css } from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useRef, useState, type FC } from "react";
import { VARIABLE_CATEGORIES } from "./constants";
import AiGenerate from "../../../../assets/icons/AiGenerate";
import { GoPlus } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import type { IVariableCategory } from "./types";
import { MdCheck, MdSearch } from "react-icons/md";
import CO2Distribution from "./CO2Distribution";
import { Button, InputContainer, SearchInput } from "../../../../styles/shared";
import { IoReload } from "react-icons/io5";
import { MEDIA_QUERIES } from "../../../../styles/breakpoints";
import { useAppSelector, type RootState } from "../../../../store";

interface IEditVariablesDrawerProps {
  onClose: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000080;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Drawer = styled.div<{ theme: string }>`
  width: 45%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme === "light" ? "#ffffff" : "#0e0d0d"};
  border-left: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  box-shadow: 0px 4px 4px 0px #00000040;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  animation: slideInRight 0.4s ease-in-out;
  overflow: auto;

  ${MEDIA_QUERIES.belowDesktop} {
    width: 60%;
  }

  ${MEDIA_QUERIES.belowTablet} {
    width: 80%;
  }

  ${MEDIA_QUERIES.belowMobile} {
    width: 100%;
  }
`;

const Header = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const Close = styled(IoMdClose)<{ theme: string }>`
  cursor: pointer;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const VariableSelectionContainer = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f8f8f8" : "#161618"};
  padding-top: 25px;
  border-radius: 5px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 25px;
  padding-right: 25px;
  &:last-child {
    padding-bottom: 25px;
  }
`;

const CategoryLabel = styled.p<{ theme: string }>`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => (theme === "light" ? "#333333" : "#d5d5d5")};
`;

const VariablesContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const VariableContainer = styled.div<{ selected?: boolean; theme: string }>`
  border-radius: 20px;
  padding: 5px 10px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#eeeeee")};
  color: ${({ theme }) => (theme === "light" ? "#333333" : "#d5d5d5")};
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === "light" ? "rgba(200, 200, 200, 0.3)" : "rgba(89, 89, 89, 0.3)"};
  font-size: 15px;
  font-weight: 400;
  ${({ selected, theme }) =>
    selected &&
    css`
      border: 1px solid ${theme === "light" ? "#8bc34a" : "#c9ff3b"};
      color: ${theme === "light" ? "#4caf50" : "rgba(200, 233, 114, 0.99)"};
      background-color: ${theme === "light"
        ? "rgba(76, 175, 80, 0.1)"
        : "#282e16"};
    `}
`;

const VariableIconContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 5px;
`;

const VariablesAccordionHeader = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 24px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f0f0f0" : "#222324"};
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  color: ${({ theme }) => (theme === "light" ? "#4caf50" : "#c8e972")};
`;

const ChevronContainer = styled.div<{ theme: string }>`
  cursor: pointer;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#4caf50" : "#c8e972")};
  border-radius: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 36px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const SearchContainer = styled(InputContainer)<{ theme: string }>`
  flex: 1;
`;

const AutofillButton = styled(Button)<{ theme: string }>`
  padding: 10px 20px;
  font-size: 16px;
`;

const RerunButton = styled(Button)<{ theme: string }>`
  background-color: ${({ theme }) =>
    theme === "light" ? "#e8f5e8" : "#23291e"};
  border: 0.67px solid
    ${({ theme }) => (theme === "light" ? "#4caf50" : "#577113")};
  color: ${({ theme }) => (theme === "light" ? "#2e7d32" : "#c9ff3b")};
  box-shadow: 0px 0px 12.7px 0px #ffffff0d inset;
  font-size: 16px;
  padding: 10px 20px;
`;

const EditVariablesDrawer: FC<IEditVariablesDrawerProps> = ({ onClose }) => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);
  const [variables, setVariables] = useState<IVariableCategory[]>(
    VARIABLE_CATEGORIES.map((category) => ({
      ...category,
      variables: category.variables.map((variable) => ({
        ...variable,
        selected: false,
      })),
    }))
  );

  const [showCO2Distribution, setShowCO2Distribution] =
    useState<boolean>(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleVariableSelect = (
    selectedCategory: string,
    selectedVariable: string
  ) => {
    setVariables(
      variables.map((category) =>
        category.value === selectedCategory
          ? {
              ...category,
              variables: category.variables.map((variable) => ({
                ...variable,
                selected:
                  variable.value === selectedVariable
                    ? !variable.selected
                    : variable.selected,
              })),
            }
          : category
      )
    );
  };

  const handleCO2DistributionHover = () => {
    const timeout = setTimeout(() => {
      setShowCO2Distribution(true);
    }, 1500);
    hoverTimeout.current = timeout;
  };

  const handleCO2DistributionLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setShowCO2Distribution(false);
  };

  return (
    <Container onClick={onClose}>
      <Drawer theme={activeTheme} onClick={(e) => e.stopPropagation()}>
        <Header theme={activeTheme}>
          <h3>Edit Variables</h3>
          <Close
            theme={activeTheme}
            color={activeTheme === "light" ? "#000000" : "#FFFFFF"}
            size={24}
            onClick={onClose}
          />
        </Header>
        <ActionsContainer>
          <SearchContainer theme={activeTheme}>
            <MdSearch
              size={26}
              color={activeTheme === "light" ? "#666666" : "#FFFFFF"}
            />
            <SearchInput theme={activeTheme} type="text" placeholder="Search" />
          </SearchContainer>
          <AutofillButton theme={activeTheme}>
            <AiGenerate
              width="18"
              height="18"
              fill={activeTheme === "light" ? "#666666" : "#B9B9B9"}
            />
            Autofill
          </AutofillButton>
          <RerunButton theme={activeTheme}>
            <IoReload
              width="17.5"
              height="15"
              color={activeTheme === "light" ? "#2e7d32" : "#C9FF3B"}
            />
            Rerun
          </RerunButton>
        </ActionsContainer>
        <VariableSelectionContainer theme={activeTheme}>
          {variables.map((category) => (
            <CategoryContainer key={category.value}>
              <CategoryLabel theme={activeTheme}>
                {category.label}
              </CategoryLabel>
              <VariablesContainer>
                {category.variables.map((variable) => (
                  <VariableContainer
                    key={variable.value}
                    onClick={() =>
                      handleVariableSelect(category.value, variable.value)
                    }
                    selected={variable.selected}
                    theme={activeTheme}
                    onMouseEnter={
                      variable.value === "co2Distribution"
                        ? handleCO2DistributionHover
                        : undefined
                    }
                    onMouseLeave={
                      variable.value === "co2Distribution"
                        ? handleCO2DistributionLeave
                        : undefined
                    }
                  >
                    {variable.label}
                    <VariableIconContainer>
                      <AiGenerate
                        width="9.69"
                        height="9.69"
                        fill={
                          variable.selected
                            ? activeTheme === "light"
                              ? "#4caf50"
                              : "#c9ff3b"
                            : activeTheme === "light"
                            ? "#666666"
                            : "#d5d5d5"
                        }
                      />
                      {variable.selected ? (
                        <MdCheck
                          width="10.21px"
                          height="7.82px"
                          fill={activeTheme === "light" ? "#4caf50" : "#c9ff3b"}
                        />
                      ) : (
                        <GoPlus
                          width="8.17"
                          height="8.17"
                          fill={activeTheme === "light" ? "#666666" : "#d5d5d5"}
                        />
                      )}
                    </VariableIconContainer>
                  </VariableContainer>
                ))}
              </VariablesContainer>
            </CategoryContainer>
          ))}
        </VariableSelectionContainer>
        {showCO2Distribution && <CO2Distribution />}
        <VariablesAccordionHeader theme={activeTheme}>
          <h4>Primary Variables</h4>
          <ChevronContainer theme={activeTheme}>
            <FaChevronDown
              color={activeTheme === "light" ? "#4caf50" : "#c8e972"}
              size={14}
            />
          </ChevronContainer>
        </VariablesAccordionHeader>
        <VariablesAccordionHeader theme={activeTheme}>
          <h4>Secondary Variables</h4>
          <ChevronContainer theme={activeTheme}>
            <FaChevronDown
              color={activeTheme === "light" ? "#4caf50" : "#c8e972"}
              size={14}
            />
          </ChevronContainer>
        </VariablesAccordionHeader>
      </Drawer>
    </Container>
  );
};

export default EditVariablesDrawer;
