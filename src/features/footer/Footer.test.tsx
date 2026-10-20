import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders the footer content properly", () => {
    render(<Footer />);

    // Check if the toolkit name and version are displayed
    expect(screen.getByText(/SIL-Y/i)).toBeInTheDocument();
    expect(screen.getByText(/v1.0.0/i)).toBeInTheDocument();
  });
});

