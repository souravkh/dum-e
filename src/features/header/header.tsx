
import logo from "../../assets/alarm.svg";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-800">
        <img
          src={logo}
          alt="Alarm"
          className="h-16 w-16"
        />
      </div>

      <div className="flex flex-col">
        <h1
          className="text-xl font-bold tracking-wider"
          style={{ color: "#fbbf24" }}
        >
          DUM-E
        </h1>

        <p className="text-xs text-slate-400">
          GP Prompt Test Toolkit · v1.0.0
        </p>
      </div>
    </header>
  );
}

export default Header;
