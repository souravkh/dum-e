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

  // Accordion open/close state for sections
  const [openSections, setOpenSections] = useState({
    upload: true,
    prompts: true,
    runner: true,
  });

  const toggleSection = (section: "upload" | "prompts" | "runner") => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  const [, setCurrentPromptDuration] = useState<string>("");

  const handlePromptFileChange = (file: File | null) => {
    setPromptFile(file);
    if (file) {
      console.log("Selected file:", file.name);
      console.log("File object:", file);
      handleFileChange(file);
    } else {
      setPrompts({});
      setCurrentPrompt("");
      setCurrentPromptDuration("");
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
      setCurrentPromptDuration("");
    }

    setCurrentPromptDuration("");
  };

  const promptCount = Object.keys(prompts).length;

  return (
    <div className="app-shell relative flex min-h-screen flex-col overflow-hidden text-[var(--ink)] transition-colors duration-300" data-theme={theme}>
      {/* Application Header */}
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")}
      />

      {/* Main Content */}
      <main className="flex-1 space-y-3 p-4">
        {/* Accordion 1: Prompt Management */}
          <section className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-glass)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => toggleSection("upload")}
              className="flex w-full cursor-pointer items-center justify-between border-b border-white/20 bg-[var(--section-header)] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xl transition hover:bg-[var(--accent-soft)]"
          >
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">
                Prompt Management
              </span>
              {promptFile && (
                <span className="max-w-35 truncate rounded bg-[var(--surface-solid)] px-2 py-0.5 text-xs text-[var(--muted)]">
                  {promptFile.name}
                </span>
              )}
            </div>

            <svg
              className={`h-4 w-4 text-[var(--muted)] transition-transform duration-200 ${
                openSections.upload ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.upload && (
            <div className="border-t border-[var(--line)] p-4">
              <PromptManagement
                file={promptFile}
                onFileChange={handlePromptFileChange}
              />
            </div>
          )}
        </section>

        {promptCount > 0 && (
          <div className="space-y-3">
            {/* Accordion 2: Prompts List */}
            <section className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-glass)] backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => toggleSection("prompts")}
                className="flex w-full cursor-pointer items-center justify-between border-b border-white/20 bg-[var(--section-header)] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xl transition hover:bg-[var(--accent-soft)]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Prompts List
                  </span>
                  <span className="rounded-full bg-[var(--surface-solid)] px-2 py-0.5 font-mono text-xs text-amber-500">
                    {promptCount}
                  </span>
                </div>

                <svg
                  className={`h-4 w-4 text-[var(--muted)] transition-transform duration-200 ${
                    openSections.prompts ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openSections.prompts && (
                <div className="border-t border-[var(--line)] p-4">
                  <Prompt
                    promptData={prompts}
                    onSelectedPromptChange={updateCurrentPrompt}
                  />
                </div>
              )}
            </section>

            {/* Accordion 3: Test Runner & Results */}
            <section className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-glass)] backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => toggleSection("runner")}
                className="flex w-full cursor-pointer items-center justify-between border-b border-white/20 bg-[var(--section-header)] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-xl transition hover:bg-[var(--accent-soft)]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--ink)]">
                    Test Runner & Results
                  </span>
                </div>

                <svg
                  className={`h-4 w-4 text-[var(--muted)] transition-transform duration-200 ${
                    openSections.runner ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openSections.runner && (
                <div className="border-t border-[var(--line)] p-3">
                  <TestRunner
                    key={currentPrompt}
                    currentPrompt={currentPrompt}
                    onSaving={updateCurrentPromptDuration}
                  />

                  <div className="mt-3 flex flex-row justify-between gap-2 border-t border-[var(--line)] pt-3">
                    <button
                      type="button"
                      onClick={() => handleExport("txt")}
                      disabled={isExporting}
                      className="cursor-pointer rounded-lg border border-white/35 bg-gradient-to-br from-[#438DFF]/95 to-[#2F72E8]/95 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,141,255,0.3)] backdrop-blur-xl transition hover:-translate-y-px hover:from-[#5598FF] hover:to-[#377FEF] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Export .TXT
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExport("xlsx")}
                      disabled={isExporting}
                      className="cursor-pointer rounded-lg border border-white/35 bg-gradient-to-br from-[#438DFF]/90 to-[#245FC7]/95 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(67,141,255,0.26)] backdrop-blur-xl transition hover:-translate-y-px hover:from-[#5598FF] hover:to-[#2F72E8] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Export .XLSX
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}

export default AppShell;
