import logo from "../../assets/alarm.svg";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="relative z-10 flex h-11 w-full shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--surface-soft)] px-3 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-1.5">
        <img src={logo} alt="" className="h-6 w-6 shrink-0" />
        <span className="shrink-0 text-sm font-bold tracking-wider text-amber-500">
          SIL-Y
        </span>
        <span className="shrink-0 text-[10px] text-[var(--muted)]">v1.0.0</span>
        <span className="min-w-0 truncate text-[10px] text-[var(--muted)]">
          GP Prompt Test Toolkit
        </span>
      </div>

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-base text-[var(--accent)] shadow-[0_4px_16px_rgba(33,51,82,0.06)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        aria-pressed={theme === "dark"}
      >
        <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
      </button>
    </header>
  );
}

export default Header;
