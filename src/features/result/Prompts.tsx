type PromptProps = {
  promptData: Record<string, string>;
  onSelectedPromptChange: (prompt: string) => void;
};

function Prompt({
  promptData,
  onSelectedPromptChange,
}: PromptProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
      <div className="max-h-64 overflow-auto">
        <table className="w-full min-w-full border-collapse text-left text-sm text-slate-300">
          <thead className="sticky top-0 z-10 bg-slate-800 text-xs uppercase tracking-wider text-amber-400">
            <tr>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">
                Prompt
              </th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">
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
                >
                  <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">
                    {gpPrompt}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                    {duration}
                  </td>
                </tr>
              )
            )}

            {Object.keys(promptData).length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-10 text-center text-slate-500"
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
