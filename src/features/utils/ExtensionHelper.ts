const TXT_EXTENSION = "txt";

function txtFileChecker(fileName: string): boolean {
  try {
    if (!fileName) {
      throw new Error("Filename cannot be empty");
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return false;
  }

  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return extension === TXT_EXTENSION;
}

export default txtFileChecker;