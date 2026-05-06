const WhyAmbient = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(168, 192, 212, 0.15) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(80, 130, 172, 0.18) 0%, transparent 55%)",
          opacity: 0.4,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
          opacity: 0.025,
        }}
      />
    </>
  );
};

export default WhyAmbient;
