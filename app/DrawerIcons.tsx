/** Ionicons used in React-Project drawer (size 20). */

import {
  IonIconBookOutline,
  IonIconBusinessOutline,
  IonIconCallOutline,
  IonIconCarSportOutline,
  IonIconDownloadOutline,
  IonIconHelpCircleOutline,
  IonIconHomeOutline,
  IonIconInformationCircleOutline,
  IonIconKeyOutline,
} from "./IonicIcons";

export function DrawerIconHome({ color }: { color: string }) {
  return <IonIconHomeOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconKey({ color }: { color: string }) {
  return <IonIconKeyOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconCallOutline({ color }: { color: string }) {
  return <IonIconCallOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconInformationCircle({ color }: { color: string }) {
  return <IonIconInformationCircleOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconCarSport({ color }: { color: string }) {
  return <IonIconCarSportOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconBusiness({ color }: { color: string }) {
  return <IonIconBusinessOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconHelpCircle({ color }: { color: string }) {
  return <IonIconHelpCircleOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconDownload({ color }: { color: string }) {
  return <IonIconDownloadOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconBook({ color }: { color: string }) {
  return <IonIconBookOutline className="h-5 w-5" style={{ color }} />;
}

export function DrawerIconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={22}
      height={22}
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden
    >
      <path
        d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"
        fill="#334155"
      />
    </svg>
  );
}
