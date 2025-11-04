import React from 'react';

            interface down_chevronProps extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
  height?: number | string;
  width?: number | string;
}

const down_chevron = (props: down_chevronProps) => (
    <svg width={props.width || "24"} height={props.height || "24"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
<path d="M5.75 9.5L12 15.75L18.25 9.5" stroke={props.stroke || "black"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default down_chevron;
