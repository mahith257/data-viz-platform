import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  unsatisfiedDemandChartData,
  unsatisfiedDemandOptions,
  staticNowLinePlugin,
  highestPointLinePlugin,
} from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  staticNowLinePlugin,
  highestPointLinePlugin
);

const Container = styled.div`
  height: 350px;
  position: relative;
`;

const UnsatisfiedDemand = () => {
  return (
    <Container>
      <Line
        data={unsatisfiedDemandChartData}
        options={unsatisfiedDemandOptions}
      />
    </Container>
  );
};

export default UnsatisfiedDemand;
