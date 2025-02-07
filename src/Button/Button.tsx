// import "./app.css";

// export function Button(props: { label: string }) {
//   return (
//     <button className="bg-neutral-500/40 rounded-xl text-neutral-200 px-3 py-1.5">
//       {props.label ?? "button"}
//     </button>
//   );
// }
"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar.tsx";

export function Button(props: { label: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}
