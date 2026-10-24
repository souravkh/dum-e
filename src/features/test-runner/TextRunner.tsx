import { useEffect, useRef, useState } from "react";

type TestRunnerProps = {
  currentPrompt: string;
  currentIndex: number;
  total: number;
  onSaving: (duration: string) => void;
};

function TestRunner({ currentPrompt, currentIndex, total, onSaving }: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const startTimestamp = useRef<number | null>(null);
  const elapsedBeforeStart = useRef<number>(0);

  useEffect(() => {
    if (!isRunning || startTimestamp.current === null) return;

    const intervalId = window.setInterval(() => {
      setElapsedMs(elapsedBeforeStart.current + Date.now() - startTimestamp.current!);
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    elapsedBeforeStart.current = elapsedMs;
    startTimestamp.current = Date.now();
    setIsRunning(true);
  };

  const handleStop = () => {
    const totalElapsed = startTimestamp.current === null
      ? elapsedMs
      : elapsedBeforeStart.current + Date.now() - startTimestamp.current;
    startTimestamp.current = null;
    elapsedBeforeStart.current = totalElapsed;
    setElapsedMs(totalElapsed);
    setIsRunning(false);
    onSaving(formatSavedTime(totalElapsed));
  };

  const handleRestart = () => {
    startTimestamp.current = null;
    elapsedBeforeStart.current = 0;
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

  const formatSavedTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = Math.floor((totalMs % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-2">
      <div className="relative rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] p-2 shadow-[var(--shadow-glass)] backdrop-blur-md">
        <div className="mb-1 pr-9 text-xs font-medium text-[var(--muted)]">
          Prompt {currentIndex} of {total}
        </div>
        <p
          title={currentPrompt}
          className="whitespace-pre-wrap break-words text-sm leading-5 text-[var(--ink)]"
        >
          {currentPrompt || "Choose a prompt from the list."}
        </p>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Prompt copied" : "Copy prompt"}
            title={copied ? "Copied" : "Copy prompt"}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--surface-solid)] text-[var(--ink)] transition hover:bg-[var(--accent-soft)]"
          >
            {copied ? (
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-emerald-500">
                <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <rect x="7" y="7" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14H7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
      </div>

      <div className="flex items-center justify-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] px-2 py-1.5 shadow-[var(--shadow-glass)] backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${isRunning ? "animate-pulse bg-emerald-500" : "bg-slate-500"}`} aria-hidden="true" />
          <span className="font-mono text-2xl font-semibold tabular-nums text-[var(--ink)]">
            {formatSavedTime(elapsedMs)}
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={isRunning ? handleStop : handleStart}
            className="rounded-md bg-[var(--accent)] px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            onClick={handleRestart}
            aria-label="Reset timer"
            title="Reset timer"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--line)] text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M4 5v4h4M4.8 8A5.5 5.5 0 1 1 5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestRunner;