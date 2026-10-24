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
        <table className="w-full table-fixed border-collapse text-left text-sm text-[var(--muted)]">
          <thead className="sticky top-0 z-10 bg-[var(--surface-solid)] text-xs uppercase tracking-wider text-amber-500">
            <tr>
              <th className="px-4 py-3 font-semibold">
                Prompt
              </th>
              <th className="w-24 px-4 py-3 font-semibold text-right whitespace-nowrap">
                Duration
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--line)]">
            {Object.entries(promptData).map(
              ([gpPrompt, duration]) => (
                <tr
                  key={gpPrompt}
                  onClick={() => onSelectedPromptChange(gpPrompt)}
                  className="cursor-pointer transition-colors duration-200 hover:bg-[var(--accent-soft)]"
                  title={gpPrompt}
                >
                  <td className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] px-4 py-3 align-top font-medium text-[var(--ink)]">
                    {gpPrompt}
                  </td>

                  <td className="w-24 whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-[var(--muted)]">
                    {duration || "--:--"}
                  </td>
                </tr>
              )
            )}

            {Object.keys(promptData).length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-8 text-center text-xs text-[var(--muted)]"
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
