export default function Laoding() {
  return (
    <div className="animate-pulse px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-zinc-700" />

              <div>
                <div className="h-4 w-32 rounded bg-zinc-700 mb-3" />
                <div className="h-6 w-56 rounded bg-zinc-700" />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-12 h-10 rounded-lg bg-zinc-700" />
              <div className="w-12 h-10 rounded-lg bg-zinc-700" />
              <div className="w-12 h-10 rounded-lg bg-zinc-700" />
            </div>
          </div>

          <div className="h-px bg-zinc-700 my-6" />

          <div className="h-5 w-full rounded bg-zinc-700 mb-3" />
          <div className="h-5 w-2/3 rounded bg-zinc-700" />

          <div className="flex flex-wrap gap-3 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-24 rounded-full bg-zinc-700" />
            ))}
          </div>

          <div className="h-px bg-zinc-700 my-6" />

          <div className="h-6 w-72 rounded bg-zinc-700" />

          <div className="h-px bg-zinc-700 my-6" />

          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-5 w-16 rounded bg-zinc-700 mb-3" />
                <div className="h-5 w-12 rounded bg-zinc-700" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-zinc-700" />
            <div className="h-5 w-40 rounded bg-zinc-700" />
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-5 w-64 rounded bg-zinc-700" />
            <div className="h-5 w-64 rounded bg-zinc-700" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-14 rounded-xl bg-zinc-700" />
          <div className="h-14 rounded-xl bg-zinc-700" />
          <div className="h-14 rounded-xl bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
