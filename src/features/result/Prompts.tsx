import React from "react";

type promptProps= {
  promptData: Record<string,string>;
  onSelectedPromptChange: (prompt:string) => void;
};

function Prompt({
  promptData,
  onSelectedPromptChange,
}: promptProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Prompt</th>
          <th>Duration</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(promptData).map(([gpPrompt, duration]) => (
          <tr key={gpPrompt}>
            <td>
                {gpPrompt}
            </td>
            <td>
                {duration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Prompt;