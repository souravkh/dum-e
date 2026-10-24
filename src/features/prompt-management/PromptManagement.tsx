import { useRef } from "react";
import uploadLogo from "../../assets/upload.svg";
import txtFileChecker from "../utils/ExtensionHelper";

type PromptUploadProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

function PromptUpload({ file, onFileChange }: PromptUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    const fileName = selectedFile?.name ?? "";
    if (!txtFileChecker(fileName)) {
      event.target.value = "";
      return;
    }
    onFileChange(selectedFile);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        readOnly
        value={file?.name ?? ""}
        placeholder="Please select a .txt file to upload prompt!"
        className="min-w-0 flex-1 truncate rounded-md border border-[var(--line-strong)] bg-[var(--surface-soft)] p-2 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
      />

      {/* Actual file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        hidden
        onChange={handleFileChange}
      />

      {/* Custom upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="shrink-0 cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface-solid)] p-2 transition hover:bg-[var(--accent-soft)]"
      >
        <img src={uploadLogo} alt="Upload file" className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => {
          if (inputRef.current) inputRef.current.value = "";
          onFileChange(null);
        }}
        disabled={!file}
        className="shrink-0 cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface-solid)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Reset
      </button>
    </div>
  );
}

export default PromptUpload;
