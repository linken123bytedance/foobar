import "./app.css";

export function Button(props: { label: string }) {
  return (
    <button className="bg-neutral-500/40 rounded-xl text-neutral-200 px-3 py-1.5">
      {props.label ?? "button"}
    </button>
  );
}
