import { useEffect, useState } from "react";

type TestRunnerProps = {
  currentPrompt: string;
  onSaving: (duration: string) => void;
};

function TestRunner({ currentPrompt, onSaving }: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setElapsedMs((ms) => ms + 10);
    }, 10);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    onSaving(formatTime(elapsedMs));
  };

  const handleRestart = () => {
    setIsRunning(false);
    setElapsedMs(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const formatTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3">
      {/* Prompt Block */}
      <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] p-2.5 shadow-[var(--shadow-glass)] backdrop-blur-xl">
        <div className="mb-1.5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-[var(--surface-solid)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--accent-soft)]"
          >
            {copied ? "Copied!" : "Copy prompt"}
          </button>
        </div>

        <textarea
          id="test-prompt"
          value={currentPrompt}
          readOnly
          rows={3}
          placeholder="Current prompt"
          className="w-full resize-y rounded-md border border-[var(--line-strong)] bg-[var(--surface)]/80 p-2.5 text-sm leading-5 text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
      </div>

      {/* Timer Display */}
      <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] px-2 py-3 text-center shadow-[var(--shadow-glass)] backdrop-blur-xl">
        <p className="mb-1 text-[11px] uppercase tracking-widest text-[var(--muted)]">
          Elapsed Time
        </p>

        <p className="font-mono text-3xl font-semibold tabular-nums text-[var(--ink)]">
          {formatTime(elapsedMs)}
        </p>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isRunning ? "bg-emerald-500" : "bg-slate-600"
            }`}
          />

          <span className="text-xs text-[var(--muted)]">
            {isRunning ? "Timer running" : "Timer stopped"}
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleStart}
          disabled={isRunning}
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start
        </button>

        <button
          type="button"
          onClick={handleStop}
          disabled={!isRunning}
          className="rounded-md bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Stop
        </button>

        <button
          type="button"
          onClick={handleRestart}
          className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default TestRunner;