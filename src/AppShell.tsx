import Header from "./features/header/header";
import Footer from "./features/footer/Footer";
import PromptManagement from "./features/prompt-management/PromptManagement";
import { useEffect, useState } from "react";
import Prompt from "./features/result/Prompts";
import {
  readPromptsFile,
  type PromptRecord,
} from "./features/utils/TxtFileReader";
import TestRunner from "./features/test-runner/TextRunner";
import { exportPrompts } from "./features/utils/exportService";

function AppShell() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      return localStorage.getItem("sil-y-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sil-y-theme", theme);
    } catch {
      // Keep the selected theme for this session when storage is unavailable.
    }
  }, [theme]);

  const [promptFile, setPromptFile] = useState<File | null>(null);
  const [prompts, setPrompts] = useState<PromptRecord>({});
  const [isExporting, setIsExporting] = useState(false);
  const [isPromptListOpen, setIsPromptListOpen] = useState(true);

  const handleExport = async (format: "txt" | "xlsx") => {
    try {
      setIsExporting(true);
      await exportPrompts(prompts, format, "my-saved-prompts");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export prompts.");
    } finally {
      setIsExporting(false);
    }
  };

  async function handleFileChange(file: File | null) {
    if (!file) return;

    const promptRecord = await readPromptsFile(file);

    setPrompts(promptRecord);
    if (promptRecord && typeof promptRecord === "object") {
      const keys = Object.keys(promptRecord);
      if (keys.length > 0) {
        const firstPrompt = keys[0];
        updateCurrentPrompt(firstPrompt);
      }
    }
    console.log(promptRecord);
  }

  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const updateCurrentPrompt = (newPrompt: string): void => {
    if (newPrompt) setCurrentPrompt(newPrompt);
  };

  const handlePromptFileChange = (file: File | null) => {
    setPromptFile(file);
    if (file) {
      console.log("Selected file:", file.name);
      console.log("File object:", file);
      handleFileChange(file);
    } else {
      setPrompts({});
      setCurrentPrompt("");
    }
  };

  const updateCurrentPromptDuration = (duration: string): void => {
    if (!currentPrompt || duration.trim() === "") return;

    setPrompts((previousPrompts) => ({
      ...previousPrompts,
      [currentPrompt]: duration,
    }));

    const promptList = Object.keys(prompts);
    const currentIndex = promptList.indexOf(currentPrompt);
    const nextPrompt = promptList[currentIndex + 1];

    if (nextPrompt) {
      setCurrentPrompt(nextPrompt);
    }
  };

  const promptList = Object.keys(prompts);
  const promptCount = promptList.length;
  const currentPromptIndex = promptList.indexOf(currentPrompt);

  return (
    <div className="app-shell relative flex h-screen flex-col overflow-hidden text-[var(--ink)] transition-colors duration-300" data-theme={theme}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")}
      />

      <main className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
        {promptCount === 0 ? (
          <section className="shrink-0 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-[var(--shadow-glass)] backdrop-blur-md">
            <PromptManagement
              file={promptFile}
              promptCount={promptCount}
              onFileChange={handlePromptFileChange}
            />
          </section>
        ) : (
          <>
            <section className="shrink-0 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-[var(--shadow-glass)] backdrop-blur-md">
              <TestRunner
                key={currentPrompt}
                currentPrompt={currentPrompt}
                currentIndex={currentPromptIndex + 1}
                total={promptCount}
                onSaving={updateCurrentPromptDuration}
              />
            </section>

            <section className="shrink-0 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-2 text-xs text-[var(--muted)] backdrop-blur-md">
              <PromptManagement
                file={promptFile}
                promptCount={promptCount}
                onFileChange={handlePromptFileChange}
              />
            </section>

            <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-glass)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIsPromptListOpen((open) => !open)}
                aria-expanded={isPromptListOpen}
                className="flex w-full shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--section-header)] px-3 py-2 text-left text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--accent-soft)]"
              >
                <span>Prompts · {promptCount}</span>
                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 text-[var(--muted)] transition-transform ${isPromptListOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </button>
              {isPromptListOpen && (
                <Prompt
                  promptData={prompts}
                  currentPrompt={currentPrompt}
                  onSelectedPromptChange={updateCurrentPrompt}
                />
              )}
            </section>

            <div className="flex shrink-0 items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleExport("txt")}
                disabled={isExporting}
                className="w-24 cursor-pointer rounded-lg border border-white/35 bg-gradient-to-br from-[#438DFF]/95 to-[#2F72E8]/95 px-3 py-1 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,141,255,0.3)] backdrop-blur-xl transition hover:from-[#5598FF] hover:to-[#377FEF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                TXT
              </button>
              <button
                type="button"
                onClick={() => handleExport("xlsx")}
                disabled={isExporting}
                className="w-24 cursor-pointer rounded-lg border border-white/35 bg-gradient-to-br from-[#438DFF]/90 to-[#245FC7]/95 px-3 py-1 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,141,255,0.26)] backdrop-blur-xl transition hover:from-[#5598FF] hover:to-[#2F72E8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                XLSX
              </button>
            </div>
          </>
        )}
      </main>

      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default AppShell;
