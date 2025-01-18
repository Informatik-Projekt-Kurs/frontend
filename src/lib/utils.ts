import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractNameInitials(name: string | undefined) {
  if (name === undefined) {
    return "";
  }
  const parts = name.trim().split(/\s+/);
  let initials = parts[0][0];

  if (parts.length > 1) {
    initials += parts[parts.length - 1][0];
  }

  return initials.toUpperCase();
}

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} - ${hours}:${minutes}`;
};

export const calculateAppointmentDuration = (fromDateString: string, toDateString: string) => {
  const fromDate = new Date(fromDateString);
  const toDate = new Date(toDateString);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const diffMinutes = Math.round((toDate - fromDate) / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes} min`;
  }

  if (diffMinutes % 60 === 0) {
    const hours = diffMinutes / 60;
    return `${hours}h`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours}h ${minutes}min`;
};
