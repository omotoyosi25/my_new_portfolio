import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={56}
    height={32}
    viewBox="0 0 56 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={56} height={32} rx={4} fill="#15171D" />
    <path
      d="M28.1395 16.2348L32.311 20.7067M23.968 20.7067L28.1395 16.2348L23.968 20.7067ZM32.311 11.763L28.1387 16.2348L32.311 11.763ZM28.1387 16.2348L23.968 11.763L28.1387 16.2348Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
