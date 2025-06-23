import type { FC } from "react";
import type { IIconProps } from "./types";

const Home: FC<IIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width || "20"}
      height={height || "17"}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z"
        fill={fill || "#858882"}
      />
    </svg>
  );
};

export default Home;
