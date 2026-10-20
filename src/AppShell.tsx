import Header from "./features/header/header";
import Footer from "./features/footer/Footer";
import PromptManagement from "./features/prompt-management/PromptManagement";
import { useState } from "react";
import Prompt from "./features/result/Prompts";
import {
  readPromptsFile,
  type PromptRecord,
} from "./features/utils/TxtFileReader";
import TestRunner from "./features/test-runner/TextRunner";
import { exportPrompts } from "./features/utils/exportService";

function AppShell() {
  const [promptFile, setPromptFile] = useState<File | null>(null);

  const handlePromptFileChange = (file: File | null) => {
    setPromptFile(file);
    if (file) {
      console.log("Selected file:", file.name);
      console.log("File object:", file);
      handleFileChange(file);
    }
  };

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
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Application Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 space-y-3 p-4">
        {/* Accordion 1: Prompt Management */}
        <section className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection("upload")}
            className="flex w-full cursor-pointer items-center justify-between p-3.5 text-left transition hover:bg-slate-800/60"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                Prompt Management
              </span>
              {promptFile && (
                <span className="max-w-[140px] truncate rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                  {promptFile.name}
                </span>
              )}
            </div>

            <svg
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
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
            <div className="border-t border-slate-800 p-4">
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
            <section className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("prompts")}
                className="flex w-full cursor-pointer items-center justify-between p-3.5 text-left transition hover:bg-slate-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    Prompts List
                  </span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-mono text-amber-400">
                    {promptCount}
                  </span>
                </div>

                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
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
                <div className="border-t border-slate-800 p-4">
                  <Prompt
                    promptData={prompts}
                    onSelectedPromptChange={updateCurrentPrompt}
                  />
                </div>
              )}
            </section>

            {/* Accordion 3: Test Runner & Results */}
            <section className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection("runner")}
                className="flex w-full cursor-pointer items-center justify-between p-3.5 text-left transition hover:bg-slate-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    Test Runner & Results
                  </span>
                </div>

                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
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
                <div className="border-t border-slate-800 p-4">
                  <TestRunner
                    currentPrompt={currentPrompt}
                    onSaving={updateCurrentPromptDuration}
                  />

                  <div className="mt-4 flex flex-row justify-between gap-2 border-t border-slate-800 pt-3">
                    <button
                      type="button"
                      onClick={() => handleExport("txt")}
                      disabled={isExporting}
                      className="cursor-pointer rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Export .TXT
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExport("xlsx")}
                      disabled={isExporting}
                      className="cursor-pointer rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
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
