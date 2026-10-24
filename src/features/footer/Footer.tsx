function Footer() {
  return (
    <footer className="flex h-7 shrink-0 items-center justify-center border-t border-[var(--line)] bg-[var(--surface-soft)] px-3 text-[var(--muted)] backdrop-blur-md">
      {/* Toolkit information */}
      <p className="text-[10px] leading-none text-[var(--muted)]">
        SIL-Y <span className="text-[var(--muted)]">|</span> v1.0.0
      </p>
    </footer>
  );
}

export default Footer;
