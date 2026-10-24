type PromptProps = {
  promptData: Record<string, string>;
  currentPrompt: string;
  onSelectedPromptChange: (prompt: string) => void;
};

function Prompt({
  promptData,
  currentPrompt,
  onSelectedPromptChange,
}: PromptProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">
      <ol className="divide-y divide-[var(--line)]">
        {Object.entries(promptData).map(([gpPrompt, duration], index) => {
          const isCurrent = gpPrompt === currentPrompt;

          return (
            <li key={gpPrompt}>
              <button
                type="button"
                onClick={() => onSelectedPromptChange(gpPrompt)}
                aria-pressed={isCurrent}
                title={gpPrompt}
                className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 border-l-[3px] px-2 py-2 text-left text-sm transition-colors ${
                  isCurrent
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-transparent hover:bg-[var(--accent-soft)]"
                }`}
              >
                <span className="text-right font-mono text-[10px] text-[var(--muted)]">
                  {index + 1}
                </span>
                <span className="line-clamp-2 min-w-0 break-words font-medium leading-5 text-[var(--ink)]">
                  {gpPrompt}
                </span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--muted)]">
                  {duration || "--:--"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Prompt;
