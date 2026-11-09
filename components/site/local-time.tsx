"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

const read = () => formatter.format(new Date());

/** Mahesh's local time (IST). Renders nothing on the server so hydration never mismatches. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, read, () => null);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? " "}
    </span>
  );
}
