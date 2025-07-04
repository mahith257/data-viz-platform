import type { FC } from "react";
import type { IIconProps } from "./types";

const CloudUpload: FC<IIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width || "22"}
      height={height || "16"}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 16H5.5C3.98 16 2.68333 15.4767 1.61 14.43C0.536667 13.3767 0 12.0933 0 10.58C0 9.28 0.39 8.12 1.17 7.1C1.95667 6.08 2.98333 5.43 4.25 5.15C4.67 3.61667 5.50333 2.37667 6.75 1.43C8.00333 0.476667 9.42 0 11 0C12.9533 0 14.6067 0.68 15.96 2.04C17.32 3.39333 18 5.04667 18 7C19.1533 7.13333 20.1067 7.63333 20.86 8.5C21.62 9.35333 22 10.3533 22 11.5C22 12.7533 21.5633 13.8167 20.69 14.69C19.8167 15.5633 18.7533 16 17.5 16H12V8.85L13.6 10.4L15 9L11 5L7 9L8.4 10.4L10 8.85V16Z"
        fill={fill || "#858882"}
      />
    </svg>
  );
};

export default CloudUpload;
