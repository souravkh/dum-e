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
import { exportPrompts } from './features/utils/exportService';


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

const handleExport = async (format: 'txt' | 'xlsx') => {
        try {
            setIsExporting(true);
            await exportPrompts(prompts, format, 'my-saved-prompts');
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export prompts.');
        } finally {
            setIsExporting(false);
        }
    };
  async function handleFileChange(file: File | null) {
    if (!file) return;

    const promptRecord = await readPromptsFile(file);

    setPrompts(promptRecord);
    if (promptRecord && typeof promptRecord === 'object') {
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
    if (newPrompt) 
      setCurrentPrompt(newPrompt);
  };

  const [currentPromptDuration, setCurrentPromptDuration] =
    useState<string>("");

  const updateCurrentPromptDuration = (duration: string):void => {
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

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Application Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4">
        {/* Feature 1: Prompt Management */}
        <PromptManagement
          file={promptFile}
          onFileChange={handlePromptFileChange}
        />

        {prompts && Object.keys(prompts).length>0 && (<div>
        {/* Feature 2: Test Runner */}
        <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <Prompt
            promptData={prompts}
            onSelectedPromptChange={updateCurrentPrompt}
          />
        </section>

        {/* Feature 3: Results */}
        <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <TestRunner
            currentPrompt={currentPrompt}
            onSaving={updateCurrentPromptDuration}
          />
       <div className="flex flex-row justify-between gap-2">
  <button
    type="button"
    onClick={() => handleExport("txt")}
    disabled={isExporting}
    className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
  >
    TXT
  </button>

  <button
    type="button"
    onClick={() => handleExport("xlsx")}
    disabled={isExporting}
    className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
  >
    XLSX
  </button>
</div>
        </section>
        </div>)}

      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}

export default AppShell;
