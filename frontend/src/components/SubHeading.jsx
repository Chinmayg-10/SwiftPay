import "../App.css"

export function SubHeading({ label }) {
  return (
    <p className="text-slate-600 dark:text-slate-300 text-base pt-1 px-4 pb-4 leading-relaxed">
      {label}
    </p>
  );
}
