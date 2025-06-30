import styled from "styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useAppSelector, type RootState } from "../../../../store";

const Container = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: ${({ theme }) =>
    theme === "light" ? "#f0f0f0" : "#222324"};
  border-top: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#525252")};
  padding: 24px;
`;

const Header = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const Content = styled.p<{ theme: string }>`
  font-size: 15px;
  color: ${({ theme }) => (theme === "light" ? "#666666" : "#bbbbbb")};
  font-weight: 400;
  line-height: 150%;
`;

const CO2Distribution = () => {
  const activeTheme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <Container theme={activeTheme}>
      <Header theme={activeTheme}>
        <h4>CO2 Distribution</h4>
        <IoMdInformationCircleOutline
          size={15}
          color={activeTheme === "light" ? "#666666" : "#FFFFFF"}
        />
      </Header>
      <Content theme={activeTheme}>
        But what truly sets Switch apart is its versatility. It can be used as a
        scooter, a bike, or even a skateboard, making it suitable for people of
        all ages. Whether you're a student, a professional, or a senior citizen,
        Switch adapts to your needs and lifestyle.
      </Content>
    </Container>
  );
};

export default CO2Distribution;
