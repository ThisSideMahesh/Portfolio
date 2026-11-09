"use client";

import { useSyncExternalStore } from "react";

const timeFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
const dateFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

const readTime = () => timeFormat.format(new Date());
const readDate = () => dateFormat.format(new Date());

/** Mahesh's local time (IST). Renders a placeholder on the server so hydration never mismatches. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, readTime, () => null);
  return <span className="tabular-nums">{time ?? " "}</span>;
}

export function LocalDate() {
  const date = useSyncExternalStore(subscribe, readDate, () => null);
  return <span>{date ?? " "}</span>;
}
