export default function Loading() {
  return (
    <div className="mx-4 mt-4 animate-pulse lg:mx-8">
      <div className="flex items-center justify-between">
        <div className="h-5 w-52 rounded bg-zinc-700" />
        <div className="h-5 w-16 rounded bg-zinc-700" />
      </div>

      <div className="my-4 h-px bg-zinc-700" />

      <div className="flex flex-wrap gap-3">
        <div className="h-11 w-28 rounded-xl bg-zinc-700" />
        <div className="h-11 w-32 rounded-xl bg-zinc-700" />
        <div className="h-11 w-14 rounded-xl bg-zinc-700" />
      </div>

      <div className="my-4 h-px bg-zinc-700" />
      <div className="flex flex-wrap gap-3">
        <div className="h-11 w-28 rounded-xl bg-zinc-700" />
        <div className="h-11 w-36 rounded-xl bg-zinc-700" />
        <div className="h-11 w-40 rounded-xl bg-zinc-700" />
      </div>

      <div className="mt-8 space-y-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-zinc-700 p-5">
            <div className="flex gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-zinc-700 shrink-0" />

              <div className="flex-1">
                <div className="h-6 w-3/4 rounded bg-zinc-700" />

                {index === 3 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="h-7 w-36 rounded-full bg-zinc-700" />
                    <div className="h-7 w-44 rounded-full bg-zinc-700" />
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="h-4 w-64 rounded bg-zinc-700" />

                  <div className="h-4 w-10 rounded bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <div className="h-10 w-24 rounded-lg bg-zinc-700" />
        <div className="h-10 w-10 rounded-lg bg-zinc-700" />
        <div className="h-10 w-10 rounded-lg bg-zinc-700" />
        <div className="h-10 w-24 rounded-lg bg-zinc-700" />
      </div>
    </div>
  );
}
