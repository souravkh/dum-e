export type PromptRecord = Record<string, string>;

export async function readPromptsFile(
  file: File
): Promise<PromptRecord> {
  const text = await file.text();

  const prompts: PromptRecord = {};

  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      prompts[line] = "";
    });

  return prompts;
}