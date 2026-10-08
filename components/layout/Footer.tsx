export function Footer() {
  return (
    <footer className="border-t bg-card px-4 py-6 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2">
        <p>Version 1.0.0</p>
        <p>© 2026 Bí Kíp Kanji</p>
        <p>Created by BÙI DUY ANH</p>
        <a
          href="https://www.buiduyanh.io.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span aria-hidden>🌐 </span>
          buiduyanh.io.vn
        </a>
      </div>
    </footer>
  );
}
