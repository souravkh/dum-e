import Header from "./features/header/header";
import Footer from "./features/footer/Footer";
import PromptManagement from "./features/prompt-management/PromptManagement";
import { useState } from "react";


function AppShell() {

    const [promptFile, setPromptFile] = useState<File | null>(null);

    const handlePromptFileChange = (file: File | null) => {
    setPromptFile(file);

    if (file) {
      console.log("Selected file:", file.name);
      console.log("File object:", file);
    }
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

        {/* Feature 2: Test Runner */}
        <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Test Runner</h2>
          <p className="mt-1 text-sm text-slate-400">
            Start and stop prompt execution timing.
          </p>
        </section>

        {/* Feature 3: Results */}
        <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Results</h2>
          <p className="mt-1 text-sm text-slate-400">
            View execution timings and export results.
          </p>
        </section>
      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}

export default AppShell;