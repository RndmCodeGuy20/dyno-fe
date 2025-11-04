import React from 'react';

interface goProps extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
  height?: number | string;
  width?: number | string;
}

const go = (props: goProps) => (
  <svg width={props.width || "24"} height={props.height || "24"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M18.25 15.25V5.75M18.25 5.75H8.75M18.25 5.75L6 18" stroke={props.stroke || "black"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export default go;
