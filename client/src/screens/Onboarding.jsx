function Zigzag({ className }) {
  return (
    <svg viewBox="0 0 96 56" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      {[0, 14, 28, 42].map((y) => (
        <polyline
          key={y}
          points={[0, 12, 24, 36, 48, 60, 72, 84, 96].map((x, i) => `${x},${y + (i % 2 ? 0 : 10)}`).join(' ')}
        />
      ))}
    </svg>
  )
}

export default function Onboarding({ onStart }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-[1.9] overflow-hidden bg-brand">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border-[10px] border-white/25" />
        <Zigzag className="absolute left-0 top-24 w-24 text-white/20" />
        <Zigzag className="absolute bottom-6 right-0 w-24 text-white/20" />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
        <h1 className="text-2xl font-semibold">Manage What To Do</h1>
        <p className="mt-3 max-w-56 text-xs text-slate-500">
          The best way to manage what you have to do, don't forget your plans
        </p>
        <button onClick={onStart} className="mt-auto h-12 w-full rounded-sm bg-brand text-sm text-white">
          Get Started
        </button>
      </div>
    </div>
  )
}
