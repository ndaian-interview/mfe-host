import React from "react";
import logo from "@/assets/images/nicu.jpg";

const TEXT_RAISE = 26; // increase = closer to image (try 8..18)

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <svg
        className="h-14 w-auto"
        viewBox="0 0 120 70"
        style={{ overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="curve-under" d="M 14,42 A 46,46 0 0 0 106,42" />

          <clipPath id="circle-clip">
            <circle cx="60" cy="22" r="18" />
          </clipPath>
        </defs>

        {/* image */}
        <image
          href={logo}
          x="42"
          y="4"
          width="36"
          height="36"
          clipPath="url(#circle-clip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* text: translate UP to reduce the gap */}
        <g transform={`translate(0, -${TEXT_RAISE})`}>
          <text fontSize="13" fill="#0f172a" fontWeight="600" letterSpacing="3">
            <textPath href="#curve-under" startOffset="50%" textAnchor="middle">
              Micro-Frontend
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
