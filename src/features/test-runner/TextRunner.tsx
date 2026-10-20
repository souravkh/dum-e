import { useEffect, useState } from "react";

type TestRunnerProps = {
  currentPrompt: string;
  onSaving: (duration: string) => void;
};

function TestRunner({ currentPrompt, onSaving }: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const [prompt, setPrompt] = useState<string>(currentPrompt);

  useEffect(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setPrompt(currentPrompt);
  }, [currentPrompt]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    onSaving(formatTime(elapsedSeconds));
  };

  const handleRestart = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      {/* Prompt Block */}
      <div className="rounded-lg border border-slate-700 bg-slate-950 p-3">
        <div className="mb-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          >
            {copied ? "Copied!" : "Copy prompt"}
          </button>
        </div>

        <textarea
          id="test-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={4}
          placeholder="Current prompt"
          className="w-full resize-y rounded-md border border-slate-700 bg-slate-900 p-3 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-sky-500"
        />
      </div>

      {/* Timer Display */}
      <div className="rounded-lg bg-slate-950 px-2 py-4 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
          Elapsed Time
        </p>

        <p className="font-mono text-4xl font-semibold tabular-nums text-white">
          {formatTime(elapsedSeconds)}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isRunning ? "bg-emerald-500" : "bg-slate-600"
            }`}
          />

          <span className="text-xs text-slate-400">
            {isRunning ? "Timer running" : "Timer stopped"}
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="mt-4 grid grid-cols-3 gap-2">
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