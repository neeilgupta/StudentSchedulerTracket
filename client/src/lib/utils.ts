import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isTomorrow, isYesterday, isPast, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDueDate(date: Date): string {
  if (isToday(date)) {
    return `Today, ${format(date, "MMM d")}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "MMM d")}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "MMM d")}`;
  } else {
    return format(date, "EEEE, MMM d");
  }
}

export function getAssignmentUrgency(dueDate: Date): "overdue" | "due-soon" | "upcoming" | "later" {
  if (isPast(dueDate) && !isToday(dueDate)) {
    return "overdue";
  }
  
  const daysUntilDue = differenceInDays(dueDate, new Date());
  
  if (daysUntilDue <= 1) {
    return "due-soon";
  } else if (daysUntilDue <= 7) {
    return "upcoming";
  } else {
    return "later";
  }
}

export function getUrgencyColor(urgency: "overdue" | "due-soon" | "upcoming" | "later"): string {
  switch (urgency) {
    case "overdue":
      return "border-red-500 bg-red-50";
    case "due-soon":
      return "border-yellow-500 bg-yellow-50";
    case "upcoming":
      return "border-blue-500 bg-blue-50";
    case "later":
      return "border-slate-300 bg-slate-50";
  }
}

export function getUrgencyTextColor(urgency: "overdue" | "due-soon" | "upcoming" | "later"): string {
  switch (urgency) {
    case "overdue":
      return "text-red-600";
    case "due-soon":
      return "text-yellow-600";
    case "upcoming":
      return "text-blue-600";
    case "later":
      return "text-slate-600";
  }
}

export function getUrgencyBadgeColor(urgency: "overdue" | "due-soon" | "upcoming" | "later"): string {
  switch (urgency) {
    case "overdue":
      return "text-red-600 bg-red-100";
    case "due-soon":
      return "text-yellow-600 bg-yellow-100";
    case "upcoming":
      return "text-blue-600 bg-blue-100";
    case "later":
      return "text-slate-600 bg-slate-200";
  }
}

export function getUrgencyLabel(urgency: "overdue" | "due-soon" | "upcoming" | "later"): string {
  switch (urgency) {
    case "overdue":
      return "OVERDUE";
    case "due-soon":
      return "DUE SOON";
    case "upcoming":
      return "UPCOMING";
    case "later":
      return "UPCOMING";
  }
}
