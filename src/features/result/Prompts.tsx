
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-slate-300">
          <thead className="bg-slate-800 text-xs uppercase tracking-wider text-amber-400">
            <tr>
              <th className="px-6 py-4 font-semibold">
                Prompt
              </th>
              <th className="px-6 py-4 font-semibold">
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
                  <td className="px-6 py-4 font-medium text-slate-100">
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
