import type { CSSProperties, ReactNode } from "react";

type IoniconProps = {
  className?: string;
  style?: CSSProperties;
};

const STROKE = 32;

function IonSvg({
  className,
  style,
  children,
}: IoniconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function strokeColor(style?: CSSProperties) {
  return style?.color ?? "currentColor";
}

export function IonIconKeyOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 0 0-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17ZM400 144a32 32 0 1 1-32-32 32 32 0 0 1 32 32Z"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    </IonSvg>
  );
}

export function IonIconCarSportOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63-38.75 52.52-50.27 70-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8 31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48-2.04-91.67-9.33-101.4M400 384h56v16h-56zM56 384h56v16H56z"
        {...stroke}
      />
      <path
        d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84M431.57 243.05a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.9 93.9 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455 455 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.4 52.4 0 0 0 .49-16.51M80.43 243.05a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.9 93.9 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455 455 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.4 52.4 0 0 1-.49-16.51"
        {...stroke}
      />
      <path d="M432 192h16M64 192h16M78 211s46.35-12 178-12 178 12 178 12" {...stroke} />
    </IonSvg>
  );
}

export function IonIconBusinessOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M176 416v64M80 32h192a32 32 0 0 1 32 32v412a4 4 0 0 1-4 4H48h0V64a32 32 0 0 1 32-32M320 192h112a32 32 0 0 1 32 32v256h0-160 0V208a16 16 0 0 1 16-16"
        {...stroke}
      />
      <path
        d="M98.08 431.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 191.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 191.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 431.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79"
        {...stroke}
      />
      <ellipse
        cx="256"
        cy="176"
        rx="15.95"
        ry="16.03"
        transform="rotate(-45 255.99 175.996)"
        {...stroke}
      />
      <path
        d="M258.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M400 400a16 16 0 1 0 16 16 16 16 0 0 0-16-16M400 320a16 16 0 1 0 16 16 16 16 0 0 0-16-16M400 240a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 400a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 320a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 240a16 16 0 1 0 16 16 16 16 0 0 0-16-16"
        {...stroke}
      />
    </IonSvg>
  );
}

export function IonIconHomeOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"
        {...stroke}
      />
      <path d="M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" {...stroke} />
    </IonSvg>
  );
}

export function IonIconCallOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160 160 0 0 0 83 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159 159 0 0 0 13.8-25.8C465 391.17 468 391.17 451 374Z"
        stroke={color}
        strokeWidth={STROKE}
        strokeMiterlimit={10}
      />
    </IonSvg>
  );
}

export function IonIconInformationCircleOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64Z"
        stroke={color}
        strokeWidth={STROKE}
        strokeMiterlimit={10}
      />
      <path d="M220 220h32v116" {...stroke} />
      <path
        d="M208 340h88"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <path d="M248 130a26 26 0 1 0 26 26 26 26 0 0 0-26-26" fill={color} />
    </IonSvg>
  );
}

export function IonIconHelpCircleOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"
        stroke={color}
        strokeWidth={STROKE}
        strokeMiterlimit={10}
      />
      <path
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        stroke={color}
        strokeWidth={28}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <circle cx="250" cy="348" r="20" fill={color} />
    </IonSvg>
  );
}

export function IonIconBookOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96M256 160v288"
        {...stroke}
      />
    </IonSvg>
  );
}

export function IonIconDownloadOutline({ className, style }: IoniconProps) {
  const color = strokeColor(style);
  const stroke = {
    stroke: color,
    strokeWidth: STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <IonSvg className={className} style={style}>
      <path
        d="M336 176h40a40 40 0 0 1 40 40v208a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V216a40 40 0 0 1 40-40h40"
        {...stroke}
      />
      <path d="m176 272 80 80 80-80M256 48v288" {...stroke} />
    </IonSvg>
  );
}

export function IonIconLocationPin({
  className,
  style,
}: IoniconProps) {
  const color = style?.color ?? "currentColor";
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden>
      <path
        fill={color}
        d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"
      />
    </svg>
  );
}
