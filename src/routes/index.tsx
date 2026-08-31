import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { LINES, ALL_STATIONS } from "@/data/lines";
import { bestContrast, tint } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tube Tracker — Tick off London Underground stations" },
      {
        name: "description",
        content:
          "Track which London Underground stations you have visited, line by line. Works offline in your browser, no account needed.",
      },
      { property: "og:title", content: "Tube Tracker — London Underground station tracker" },
      {
        property: "og:description",
        content:
          "Tick off every Tube station you have visited across all 11 lines. Progress saves in your browser.",
      },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "tube-tracker-visited";

function Index() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [flashed, setFlashed] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setVisited(new Set(parsed as string[]));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
    } catch {
      /* ignore */
    }
  }, [visited, hydrated]);

  const line = LINES[activeIndex]!;

  const unvisitedBg = useMemo(() => tint(line.colour, 0.72), [line.colour]);
  const unvisitedText = useMemo(
    () => bestContrast(unvisitedBg, line.colour, line.textColour),
    [unvisitedBg, line.colour, line.textColour],
  );

  const toggle = (station: string) => {
    setFlashed(station);
    window.setTimeout(() => setFlashed((s) => (s === station ? null : s)), 200);
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(station)) next.delete(station);
      else next.add(station);
      return next;
    });
  };

  const totalVisited = useMemo(
    () => ALL_STATIONS.filter((s) => visited.has(s)).length,
    [visited],
  );
  const lineStations = useMemo(
    () => Array.from(new Set(line.stations)),
    [line],
  );
  const lineVisited = lineStations.filter((s) => visited.has(s)).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-white pb-24 font-sans antialiased">
      <header
        className="sticky top-0 z-30 border-b px-5 py-3"
        style={{ backgroundColor: "#EEEEEE", borderColor: "#D9D9D9" }}
      >
        <h1 className="text-[22px] font-bold tracking-tight text-black">Tube Tracker</h1>
        <p className="text-[15px] font-normal tracking-tight text-neutral-600">
          {totalVisited} of {ALL_STATIONS.length} stations visited
        </p>
      </header>

      <nav
        aria-label="Tube lines"
        className="no-scrollbar sticky top-[76px] z-20 flex gap-2 overflow-x-auto bg-white px-4 py-2"
      >
        {LINES.map((l, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={l.name}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-current={active ? "true" : undefined}
              className="h-10 shrink-0 rounded-lg px-3 text-[14px] font-bold tracking-tight transition-transform active:scale-95"
              style={
                active
                  ? { backgroundColor: l.colour, color: l.textColour }
                  : {
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${l.colour}`,
                      color: l.colour === "#FFD300" ? "#8a7200" : l.colour,
                    }
              }
            >
              {l.name}
            </button>
          );
        })}
      </nav>

      <section
        className="px-5 py-3"
        style={{ backgroundColor: line.colour, color: line.textColour }}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[16px] font-bold tracking-tight">{line.name}</span>
          <span className="text-[14px] font-semibold tabular-nums">
            {lineVisited}/{lineStations.length} visited
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/35">
          <div
            className="h-full rounded-full bg-white/90 transition-all duration-300"
            style={{
              width: `${lineStations.length ? (lineVisited / lineStations.length) * 100 : 0}%`,
            }}
          />
        </div>
      </section>

      <ul className="flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
        {lineStations.map((station) => {
          const isVisited = visited.has(station);
          return (
            <li key={station} style={{ borderBottom: "1px solid #FFFFFF" }}>
              <button
                type="button"
                aria-pressed={isVisited}
                onClick={() => toggle(station)}
                className="flex min-h-16 w-full text-left transition-transform duration-150 active:scale-[0.985]"
                style={{ opacity: isVisited ? 0.45 : 1 }}
              >
                <span
                  className="flex w-[58%] items-center py-3 pr-3 pl-5 text-[17px] font-bold tracking-tight"
                  style={{
                    backgroundColor: line.colour,
                    color: line.textColour,
                    textDecoration: isVisited ? "line-through" : "none",
                  }}
                >
                  {station}
                </span>
                <span
                  className="flex flex-1 items-center justify-between py-3 pr-5 pl-4 transition-colors duration-150"
                  style={{
                    backgroundColor: line.colour,
                    color: line.textColour,
                    filter: flashed === station ? "brightness(0.92)" : "none",
                  }}
                >
                  <span className="text-[15px] font-medium tracking-tight" style={{ color: line.textColour }}>
                    {isVisited ? "Visited" : null}
                  </span>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={
                      isVisited
                        ? { backgroundColor: line.textColour }
                        : { border: `2px solid ${line.textColour}` }
                    }
                    aria-hidden="true"
                  >
                    {isVisited && <Check size={14} strokeWidth={3} color={line.colour} />}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-[480px] items-center justify-end border-t px-4 py-3"
        style={{ backgroundColor: "#EEEEEE", borderColor: "#D9D9D9" }}
      >
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="h-11 shrink-0 px-2 text-[15px] font-bold tracking-tight text-[#C31A18]"
        >
          Reset all
        </button>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset all visited stations?</AlertDialogTitle>
            <AlertDialogDescription>
              This clears all {totalVisited} ticked stations. It can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setVisited(new Set())}>
              Reset all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
