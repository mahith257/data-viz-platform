import type {
  Chart,
  ChartData,
  ChartOptions,
  Plugin,
  TooltipModel,
} from "chart.js";

const staticNowLinePlugin: Plugin<"line"> = {
  id: "staticNowLine",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    const nowIndex = 2.2;
    const x = xScale.getPixelForValue(nowIndex);
    const topY = yScale.top;
    const bottomY = yScale.bottom;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#878787";
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    ctx.fillStyle = "#878787";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    ctx.fillText("Now", x, bottomY + 40);

    ctx.restore();
  },
};

const highestPointLinePlugin: Plugin<"line"> = {
  id: "highestPointLine",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const data = dataset.data as number[];

    const maxValue = Math.max(...data);
    const maxIndex = data.indexOf(maxValue);

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;
    const x = xScale.getPixelForValue(maxIndex);
    const topY = yScale.getPixelForValue(maxValue);
    const bottomY = yScale.bottom;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#C8E972";
    ctx.setLineDash([8, 4]);
    ctx.stroke();

    ctx.restore();
  },
};

export const unsatisfiedDemandChartData: ChartData<"line", number[], string> = {
  labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "Unsatisfied Demand %",
      data: [38000, 20000, 48000, 42000, 89600, 60000, 35000, 59000],
      borderColor: "#C8E972",
      backgroundColor: "#222324",
      borderWidth: 3,
      pointBackgroundColor: "#C8E972",
      pointBorderColor: "#C8E972",
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHoverBorderWidth: 4,
      pointHoverBorderColor: "#C8E972",
      pointHoverBackgroundColor: "#C8E972",
      tension: 0,
      fill: false,
    },
  ],
};

export const unsatisfiedDemandOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 15,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: function (context: {
        tooltip: TooltipModel<"line">;
        chart: Chart;
      }) {
        const tooltipEl =
          document.getElementById("chartjs-tooltip") ||
          document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";

        if (!tooltipEl.parentNode) {
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        }

        if (tooltipModel.body) {
          const dataPoint = tooltipModel.dataPoints[0];
          const value = dataPoint.raw as number;
          const target = 85000;
          const percentage = (((value - target) / target) * 100).toFixed(1);
          const arrow =
            value > target
              ? `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15.5001" y="1" width="15" height="15" rx="7.5" transform="rotate(90 15.5001 1)" fill="#C8E972" fill-opacity="0.2"/>
<rect x="15.5001" y="1" width="15" height="15" rx="7.5" transform="rotate(90 15.5001 1)" stroke="#C8E972"/>
<path d="M8.41672 11.8333H7.58339V6.83334L5.29172 9.125L4.70006 8.53334L8.00006 5.23334L11.3001 8.53334L10.7084 9.125L8.41672 6.83334V11.8333Z" fill="#C8E972"/>
</svg>
`
              : `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15.5001" y="1" width="15" height="15" rx="7.5" transform="rotate(90 15.5001 1)" fill="#C8E972" fill-opacity="0.2"/>
<rect x="15.5001" y="1" width="15" height="15" rx="7.5" transform="rotate(90 15.5001 1)" stroke="#C8E972"/>
<path d="M8.41672 11.8333H7.58339V6.83334L5.29172 9.125L4.70006 8.53334L8.00006 5.23334L11.3001 8.53334L10.7084 9.125L8.41672 6.83334V11.8333Z" fill="#C8E972"/>
</svg>
`;
          const color = value > target ? "above" : "below";

          tooltipEl.innerHTML = `
            <div style="
              background: #22232433;
              border: 1px solid #525252;
              border-radius: 5px;
              padding: 20px;
              color: white;
              font-family: Inter;
              backdrop-filter: blur(10px);
              display: flex;
              flex-direction: column;
              gap: 10px;
              animation: fadeIn 0.3s ease-in-out;
            ">
              <div style="
                font-size: 20px;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: space-between;
              ">
                $${(value / 1000).toFixed(2)}k
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6.30012 11.2H7.70012V9.8H6.30012V11.2ZM7.00012 0C6.08087 0 5.17062 0.18106 4.32134 0.532843C3.47206 0.884626 2.70038 1.40024 2.05037 2.05025C0.73762 3.36301 0.00012207 5.14348 0.00012207 7C0.00012207 8.85651 0.73762 10.637 2.05037 11.9497C2.70038 12.5998 3.47206 13.1154 4.32134 13.4672C5.17062 13.8189 6.08087 14 7.00012 14C8.85664 14 10.6371 13.2625 11.9499 11.9497C13.2626 10.637 14.0001 8.85651 14.0001 7C14.0001 6.08075 13.8191 5.17049 13.4673 4.32122C13.1155 3.47194 12.5999 2.70026 11.9499 2.05025C11.2999 1.40024 10.5282 0.884626 9.67891 0.532843C8.82963 0.18106 7.91937 0 7.00012 0ZM7.00012 12.6C3.91312 12.6 1.40012 10.087 1.40012 7C1.40012 3.913 3.91312 1.4 7.00012 1.4C10.0871 1.4 12.6001 3.913 12.6001 7C12.6001 10.087 10.0871 12.6 7.00012 12.6ZM7.00012 2.8C6.25752 2.8 5.54532 3.095 5.02022 3.6201C4.49512 4.1452 4.20012 4.85739 4.20012 5.6H5.60012C5.60012 5.2287 5.74762 4.8726 6.01017 4.61005C6.27272 4.3475 6.62882 4.2 7.00012 4.2C7.37143 4.2 7.72752 4.3475 7.99007 4.61005C8.25262 4.8726 8.40012 5.2287 8.40012 5.6C8.40012 7 6.30012 6.825 6.30012 9.1H7.70012C7.70012 7.525 9.80012 7.35 9.80012 5.6C9.80012 4.85739 9.50512 4.1452 8.98002 3.6201C8.45492 3.095 7.74273 2.8 7.00012 2.8Z" fill="#888888"/>
                </svg>
              </div>
              <div style="
                font-size: 16px;
                font-weight: 400;
                color: #878787;
                display: flex;
                align-items: center;
                gap: 10px;
              ">
                ${arrow}
                ${percentage}% ${color} target
              </div>
            </div>
          `;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = "1";
        tooltipEl.style.position = "absolute";
        const tooltipRect = tooltipEl.getBoundingClientRect();

        const leftPosition =
          position.left +
          window.pageXOffset +
          tooltipModel.caretX -
          tooltipRect.width / 2;
        const topPosition =
          position.top +
          window.pageYOffset +
          tooltipModel.caretY -
          tooltipRect.height -
          10;
        tooltipEl.style.left = leftPosition + "px";
        tooltipEl.style.top = topPosition + "px";
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.zIndex = "1000";
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "#575757",
        lineWidth: 0.77,
        drawTicks: false,
      },
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 12.25,
          weight: 500,
        },
        padding: 10,
        callback: function (value: number | string, index: number) {
          if (index === 0) return "";
          return this.getLabelForValue(Number(value));
        },
      },
      border: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 100000,
      grid: {
        color: "#575757",
        lineWidth: 0.77,
        drawTicks: false,
      },
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 12.25,
          weight: 500,
        },
        padding: 20,
        callback: function (value: number | string, index: number) {
          if (index === 0) return "";
          return "$" + Number(value) / 1000 + "K";
        },
        stepSize: 20000,
      },
      border: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      hoverBorderWidth: 4,
    },
  },
  onHover: (event, elements) => {
    if (event.native?.target) {
      (event.native.target as HTMLElement).style.cursor =
        elements.length > 0 ? "pointer" : "default";
    }
  },
};

export { staticNowLinePlugin, highestPointLinePlugin };
