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
        className="min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-white placeholder:text-slate-400 truncate"
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
        className="cursor-pointer shrink-0 rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
      >
        <img src={uploadLogo} alt="Upload file" className="h-6 w-6" />
      </button>
    </div>
  );
}

export default PromptUpload;
