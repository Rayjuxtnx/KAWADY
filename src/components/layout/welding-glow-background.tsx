
export function WeldingGlowBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,215,0,0.4),rgba(255,255,255,0))] bg-no-repeat opacity-40 animate-weld-glow-1" />
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,191,255,0.3),rgba(255,255,255,0))] bg-no-repeat opacity-40 animate-weld-glow-2" />
    </div>
  );
}
