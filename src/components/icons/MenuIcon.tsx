import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.5} filter="url(#filter0_b_12870_23251)">
      <rect width={34} height={34} rx={5} fill="white" fillOpacity={0.2} />
    </g>
    <rect x={7} y={12} width={20} height={2.10526} rx={1.05263} fill="white" />
    <rect
      x={7}
      y={20.4236}
      width={20}
      height={2.10526}
      rx={1.05263}
      fill="white"
    />
    <defs>
      <filter
        id="filter0_b_12870_23251"
        x={-134}
        y={-134}
        width={302}
        height={302}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={67} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_12870_23251"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_12870_23251"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SVGComponent;
