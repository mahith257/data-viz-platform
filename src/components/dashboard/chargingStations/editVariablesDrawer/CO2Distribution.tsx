import styled from "styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #222324;
  border-top: 1px solid #525252;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Content = styled.p`
  font-size: 15px;
  color: #bbbbbb;
  font-weight: 400;
  line-height: 150%;
`;

const CO2Distribution = () => {
  return (
    <Container>
      <Header>
        <h4>CO2 Distribution</h4>
        <IoMdInformationCircleOutline size={15} color="#FFFFFF" />
      </Header>
      <Content>
        But what truly sets Switch apart is its versatility. It can be used as a
        scooter, a bike, or even a skateboard, making it suitable for people of
        all ages. Whether you're a student, a professional, or a senior citizen,
        Switch adapts to your needs and lifestyle.
      </Content>
    </Container>
  );
};

export default CO2Distribution;
