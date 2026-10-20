type PromptProps = {
  promptData: Record<string, string>;
  onSelectedPromptChange: (prompt: string) => void;
};

function Prompt({
  promptData,
  onSelectedPromptChange,
}: PromptProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div className="max-h-60 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed border-collapse text-left text-sm text-slate-300">
          <thead className="sticky top-0 z-10 bg-slate-800 text-xs uppercase tracking-wider text-amber-400">
            <tr>
              <th className="px-4 py-3 font-semibold">
                Prompt
              </th>
              <th className="w-24 px-4 py-3 font-semibold text-right whitespace-nowrap">
                Duration
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700">
            {Object.entries(promptData).map(
              ([gpPrompt, duration]) => (
                <tr
                  key={gpPrompt}
                  onClick={() => onSelectedPromptChange(gpPrompt)}
                  className="cursor-pointer transition-colors duration-200 hover:bg-slate-800"
                  title={gpPrompt}
                >
                  <td className="px-4 py-3 font-medium text-slate-100 truncate">
                    {gpPrompt}
                  </td>

                  <td className="w-24 px-4 py-3 text-right font-mono text-xs text-slate-400 whitespace-nowrap">
                    {duration || "--:--"}
                  </td>
                </tr>
              )
            )}

            {Object.keys(promptData).length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-8 text-center text-xs text-slate-500"
                >
                  No prompts available. Please upload a prompt file.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prompt;
