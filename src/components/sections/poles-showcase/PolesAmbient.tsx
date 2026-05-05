const PolesAmbient = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Mesh */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.55,
          background:
            "radial-gradient(ellipse at 80% 30%, var(--pole-base) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 20% 70%, var(--pole-deep) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 65% 90%, var(--pole-base) 0%, transparent 50%)," +
            "var(--surface-darker)",
        }}
      />
      {/* Noise */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.025,
          mixBlendMode: "overlay",
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0, white 1px, transparent 1px, transparent 3px)," +
            "repeating-linear-gradient(90deg, white 0, white 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,17,0.45) 0%, rgba(5,8,17,0) 20%, rgba(5,8,17,0) 80%, rgba(5,8,17,0.6) 100%)",
        }}
      />
    </div>
  );
};

export default PolesAmbient;
