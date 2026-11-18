export default function NebulaBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Rich Dark Cosmic Base (#050510 -> #0d0b26) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, #0d0b26 0%, #070718 50%, #050510 100%)',
        }}
      />

      {/* Deep Purple & Indigo Nebula Cloud (Upper Left) */}
      <div
        className="absolute -top-36 -left-28 w-[640px] h-[640px] rounded-full opacity-40 blur-[110px] animate-nebula-a will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 58, 179, 0.72) 0%, rgba(45, 36, 118, 0.48) 45%, transparent 74%)',
        }}
      />

      {/* Magenta & Violet Nebula Cloud (Upper Right) */}
      <div
        className="absolute top-[12%] -right-32 w-[600px] h-[600px] rounded-full opacity-35 blur-[115px] animate-nebula-b will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(164, 58, 148, 0.55) 0%, rgba(116, 101, 201, 0.38) 45%, transparent 74%)',
        }}
      />

      {/* Subtle Cyan / Teal Cosmic Wisps (Lower Left & Mid) */}
      <div
        className="absolute bottom-[10%] left-[8%] w-[520px] h-[420px] rounded-full opacity-28 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(36, 148, 176, 0.45) 0%, rgba(37, 59, 117, 0.32) 50%, transparent 76%)',
        }}
      />

      {/* Indigo Deep Horizon Glow */}
      <div
        className="absolute -bottom-44 right-[15%] w-[700px] h-[480px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(62, 54, 156, 0.6) 0%, rgba(13, 11, 38, 0.35) 55%, transparent 78%)',
        }}
      />
    </div>
  );
}
