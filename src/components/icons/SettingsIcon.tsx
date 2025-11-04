import React from 'react';

            interface settingsProps extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
  height?: number | string;
  width?: number | string;
}

const settings = (props: settingsProps) => (
    <svg width={props.width || "24"} height={props.height || "24"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
<path d="M11.0021 3.32455C11.6198 2.96888 12.3802 2.96888 12.9979 3.32455L19.2479 6.923C19.8679 7.27995 20.25 7.94086 20.25 8.65625V15.3436C20.25 16.059 19.8679 16.7199 19.2479 17.0769L12.9979 20.6753C12.3802 21.031 11.6198 21.031 11.0021 20.6754L4.75213 17.0772C4.13213 16.7202 3.75 16.0593 3.75 15.3439L3.75 8.65622C3.75 7.94083 4.13211 7.27992 4.75208 6.92297L11.0021 3.32455Z" stroke={props.stroke || "black"} stroke-width="1.5" stroke-linecap="square"/><path d="M15.25 12C15.25 13.7949 13.795 15.25 12 15.25C10.2051 15.25 8.75003 13.7949 8.75003 12C8.75003 10.2051 10.2051 8.75 12 8.75C13.795 8.75 15.25 10.2051 15.25 12Z" stroke={props.stroke || "black"} stroke-width="1.5" stroke-linecap="square"/>
</svg>
);

export default settings;
