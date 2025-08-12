import "../App.css";

export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold rounded-lg text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-all duration-200"
    >
      {label}
    </button>
  );
}
