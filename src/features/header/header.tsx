import logo from "../../assets/alarm.svg";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="relative z-10 flex min-h-[68px] w-full items-center justify-between border-b border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 backdrop-blur-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
        <img src={logo} alt="Alarm" className="h-8 w-8" />
      </div>

      <div className="flex items-center gap-4 max-sm:gap-2">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--ink)] shadow-[0_4px_16px_rgba(33,51,82,0.06)] transition hover:-translate-y-px hover:border-[var(--accent)] max-sm:gap-1.5 max-sm:px-2.5 max-sm:text-[11px]"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-pressed={theme === "dark"}
        >
          <span className="text-[17px] leading-none text-[var(--accent)]" aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>

        <div className="flex flex-col">
          <h5 className="text-right text-xl font-bold tracking-wider text-amber-400">
            SIL-Y
          </h5>
          <p className="text-right text-xs text-[var(--muted)]">
            GP Prompt Test Toolkit · v1.0.0
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
