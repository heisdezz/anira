export default function BackgroundGrid() {
  return (
    <div
      className="absolute inset-0 opacity-20 -z-10 blur-[2px]"
      style={{
        backgroundImage: `
            linear-gradient(to right, var(--color-base-content) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-base-content) 1px, transparent 1px)
          `,
        backgroundSize: "20px 30px",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
      }}
    />
  );
}
