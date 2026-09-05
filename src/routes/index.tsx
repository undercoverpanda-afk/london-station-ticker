import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, NotebookPen } from "lucide-react";
import { toast } from "sonner";
import { LINES, ALL_STATIONS } from "@/data/lines";
import { bestContrast, tint } from "@/lib/utils";
import tubeCar from "@/assets/tube-car-pixel.svg.asset.json";
import { StationNoteDialog, type StationNote } from "@/components/StationNoteDialog";
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
      { title: "Tube Ticker — Tick off London Underground stations" },
      {
        name: "description",
        content:
          "Track which London Underground stations you have visited, line by line. Works offline in your browser, no account needed.",
      },
      { property: "og:title", content: "Tube Ticker — London Underground station tracker" },
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
const NOTES_KEY = "tube-tracker-notes";

function formatDate(iso: string) {
  if (!iso) return "Date not recorded";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "Date not recorded";
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

function Index() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, StationNote>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [dialogStation, setDialogStation] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [flashed, setFlashed] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setVisited(new Set(parsed as string[]));
      }
      const rawNotes = localStorage.getItem(NOTES_KEY);
      if (rawNotes) {
        const parsed = JSON.parse(rawNotes);
        if (parsed && typeof parsed === "object")
          setNotes(parsed as Record<string, StationNote>);
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
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch {
      /* ignore */
    }
  }, [visited, notes, hydrated]);

  const line = LINES[activeIndex]!;

  const unvisitedBg = useMemo(() => tint(line.colour, 0.72), [line.colour]);
  const unvisitedText = useMemo(
    () => bestContrast(unvisitedBg, line.colour, line.textColour),
    [unvisitedBg, line.colour, line.textColour],
  );

  const toggle = (station: string) => {
    setFlashed(station);
    window.setTimeout(() => setFlashed((s) => (s === station ? null : s)), 200);
    const wasVisited = visited.has(station);
    setVisited((prev) => {
      const next = new Set(prev);
      if (wasVisited) next.delete(station);
      else next.add(station);
      return next;
    });
    if (wasVisited) {
      setExpanded((prev) => {
        const next = new Set(prev);
        next.delete(station);
        return next;
      });
      return;
    }
    if (notes[station]?.submitted) {
      toast("Previous note restored");
    }
  };

  const saveNote = (station: string, note: StationNote) => {
    setNotes((prev) => ({ ...prev, [station]: note }));
  };

  const openNote = (station: string) => {
    setDialogStation(station);
    setDialogOpen(true);
  };

  const toggleExpanded = (station: string) => {
    setExpanded((prev) => {
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
  const lineProgress = lineStations.length
    ? (lineVisited / lineStations.length) * 100
    : 0;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-white pb-24 font-sans antialiased">
      <header
        className="sticky top-0 z-30 flex items-center justify-between border-b px-5 py-3"
        style={{ backgroundColor: "#EEEEEE", borderColor: "#D9D9D9" }}
      >
        <h1 className="text-[22px] font-bold tracking-tight text-black">Tube Ticker</h1>
        <div className="flex flex-col items-end leading-none">
          <span className="text-[28px] font-bold tracking-tight text-black">
            {totalVisited}/{ALL_STATIONS.length}
          </span>
          <span className="mt-0.5 text-[13px] font-medium tracking-tight text-neutral-600">
            stations visited
          </span>
        </div>
      </header>

      <nav
        aria-label="Tube lines"
        className="no-scrollbar sticky top-[68px] z-20 flex gap-2 overflow-x-auto bg-white px-4 py-2"
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
        className="px-5 py-6"
        style={{ backgroundColor: line.colour, color: line.textColour }}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[16px] font-bold tracking-tight">{line.name}</span>
          <span className="text-[14px] font-semibold tabular-nums">
            {lineVisited}/{lineStations.length} visited
          </span>
        </div>
        <div className="relative mt-5 h-3 w-full rounded-full bg-white/35">
          <div
            className="h-full overflow-hidden rounded-full bg-white/90 transition-all duration-300"
            style={{ width: `${lineProgress}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-[30px] w-[72px] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-300 motion-reduce:transition-none"
            style={{ left: `clamp(36px, ${lineProgress}%, calc(100% - 36px))` }}
          >
            <img
              src={tubeCar.url}
              alt=""
              className="h-full w-full scale-x-[-1] object-contain [image-rendering:pixelated]"
            />
          </span>
        </div>
        {lineProgress === 100 && (
          <div className="mt-4 rounded-xl bg-white/20 px-4 py-3 text-[15px] font-semibold leading-snug tracking-tight backdrop-blur-sm">
            Congratulations, you&apos;ve reached the end of the line. This service
            terminates here. All change please.
          </div>
        )}
      </section>

      <ul className="flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
        {lineStations.map((station) => {
          const isVisited = visited.has(station);
          const note = notes[station];
          const hasNote = isVisited && !!note?.submitted;
          const isOpen = expanded.has(station);
          const rowBg = isVisited ? line.colour : unvisitedBg;
          const rowFg = isVisited ? line.textColour : unvisitedText;
          return (
            <li key={station} style={{ borderBottom: "1px solid #FFFFFF" }}>
              <div
                className="flex min-h-16 w-full items-stretch"
                style={{
                  backgroundColor: rowBg,
                  color: rowFg,
                  filter: flashed === station ? "brightness(0.92)" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(station)}
                  className="flex flex-1 items-center gap-3 py-3 pr-3 pl-5 text-left transition-transform duration-150 active:scale-[0.985]"
                >
                  <span className="flex-1 text-[17px] font-bold tracking-tight">
                    {station}
                  </span>
                </button>

                {isVisited && (
                  <div className="flex items-center gap-1 pr-2 pl-1">
                    {!hasNote && (
                      <button
                        type="button"
                        onClick={() => openNote(station)}
                        aria-label={`Note for ${station}`}
                        className="flex h-11 w-9 items-center justify-center"
                        style={{ color: rowFg }}
                      >
                        <NotebookPen size={18} strokeWidth={2.2} />
                      </button>
                    )}
                    {hasNote && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(station)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} note for ${station}`}
                        className="flex h-11 w-9 items-center justify-center"
                        style={{ color: rowFg }}
                      >
                        <ChevronDown
                          size={18}
                          strokeWidth={2.2}
                          className="transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                        />
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  aria-pressed={isVisited}
                  onClick={() => toggle(station)}
                  className="flex items-center gap-3 py-3 pr-5 pl-3 text-left transition-transform duration-150 active:scale-[0.985]"
                >
                  {isVisited && (
                    <span className="text-[15px] font-medium tracking-tight">Visited</span>
                  )}
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={
                      isVisited
                        ? { backgroundColor: line.textColour }
                        : { border: `2px solid ${unvisitedText}` }
                    }
                    aria-hidden="true"
                  >
                    {isVisited && <Check size={14} strokeWidth={3} color={line.colour} />}
                  </span>
                </button>
              </div>

              {hasNote && (
                <div
                  className="grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 py-4"
                      style={{
                        backgroundColor: unvisitedBg,
                        color: unvisitedText,
                        borderLeft: `3px solid ${line.colour}`,
                      }}
                    >
                      <p className="text-[13px] font-semibold tracking-tight">
                        {formatDate(note!.visitedOn)}
                      </p>
                      {note!.reason ? (
                        <p className="mt-1.5 text-[15px] leading-snug whitespace-pre-wrap">
                          {note!.reason}
                        </p>
                      ) : (
                        <p className="mt-1.5 text-[15px] italic opacity-80">
                          No reason recorded
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => openNote(station)}
                        className="mt-3 h-9 rounded-lg px-3 text-[14px] font-bold tracking-tight"
                        style={{ backgroundColor: line.colour, color: line.textColour }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
            <AlertDialogAction
              onClick={() => {
                setVisited(new Set());
                setNotes({});
                setExpanded(new Set());
              }}
            >
              Reset all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <StationNoteDialog
        station={dialogStation}
        note={dialogStation ? notes[dialogStation] : undefined}
        lineColour={line.colour}
        lineTextColour={line.textColour}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={saveNote}
      />
    </main>
  );
}
