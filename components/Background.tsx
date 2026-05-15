export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      aria-hidden
    >
      <div className="grid-background absolute inset-0" />
    </div>
  );
}
