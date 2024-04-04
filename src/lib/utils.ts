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
