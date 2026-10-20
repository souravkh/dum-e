import { describe, it, expect } from "vitest";
import txtFileChecker from "./ExtensionHelper";

describe("txtFileChecker", () => {
  it("should return true for a .txt file", () => {
    const result = txtFileChecker("prompts.txt");
    expect(result).toBe(true);
  });

  it("should return true for uppercase .TXT file", () => {
    const result = txtFileChecker("PROMPTS.TXT");
    expect(result).toBe(true);
  });

  it("should return false for non-txt file extensions", () => {
    expect(txtFileChecker("data.csv")).toBe(false);
    expect(txtFileChecker("document.pdf")).toBe(false);
  });

  it("should return false for an empty file name", () => {
    expect(txtFileChecker("")).toBe(false);
  });
});

