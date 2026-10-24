function Footer() {
  return (
    <footer className="flex min-h-11 items-center justify-center border-t border-[var(--line)] bg-[var(--surface-soft)] px-3 py-2 text-[var(--muted)] backdrop-blur-xl">
      {/* Toolkit information */}
      <p className="text-xs text-[var(--muted)]">
        SIL-Y <span className="text-[var(--muted)]">|</span> v1.0.0
      </p>
    </footer>
  );
}

export default Footer;
