export function SectionShell({ id, children, className = "" }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">{children}</div>
    </section>
  );
}
