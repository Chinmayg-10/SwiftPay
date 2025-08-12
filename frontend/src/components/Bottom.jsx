import "../App.css";
import { Link } from "react-router-dom";

export function Bottom({ label, buttonText, to }) {
  return (
    <div className="py-3 text-sm flex justify-center items-center text-slate-600">
      <span>{label}</span>
      <Link
        to={to}
        className="pl-1 text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline transition-colors duration-200"
      >
        {buttonText}
      </Link>
    </div>
  );
}
