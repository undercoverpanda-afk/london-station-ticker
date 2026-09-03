import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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

export type StationNote = {
  visitedOn: string;
  reason: string;
  submitted: boolean;
};

const MAX = 500;

export function todayISO() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function StationNoteDialog({
  station,
  note,
  lineColour,
  lineTextColour,
  open,
  onOpenChange,
  onSave,
}: {
  station: string | null;
  note: StationNote | undefined;
  lineColour: string;
  lineTextColour: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (station: string, note: StationNote) => void;
}) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDate(note?.visitedOn ?? "");
      setReason(note?.reason ?? "");
      setConfirmDiscard(false);
      const t = window.setTimeout(() => dateRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, station, note?.visitedOn, note?.reason]);

  const dirty = date !== (note?.visitedOn ?? "") || reason !== (note?.reason ?? "");

  const requestClose = () => {
    if (dirty) setConfirmDiscard(true);
    else onOpenChange(false);
  };

  const save = () => {
    if (!station || !date) return;
    onSave(station, { visitedOn: date, reason: reason.trim(), submitted: true });
    onOpenChange(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) requestClose();
          else onOpenChange(true);
        }}
      >
        <DialogContent
          
          className="top-auto bottom-0 left-1/2 w-full max-w-[480px] translate-x-[-50%] translate-y-0 gap-0 overflow-hidden rounded-t-2xl rounded-b-none p-0 sm:rounded-b-none"
        >
          <div
            className="px-5 py-4"
            style={{ backgroundColor: lineColour, color: lineTextColour }}
          >
            <DialogTitle className="text-[18px] font-bold tracking-tight">
              {station}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Record when and why you visited this station.
            </DialogDescription>
          </div>

          <div className="flex flex-col gap-4 px-5 py-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold tracking-tight text-foreground">
                Date visited
              </span>
              <input
                ref={dateRef}
                type="date"
                value={date}
                max={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-11 rounded-lg border border-input bg-background px-3 text-[15px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold tracking-tight text-foreground">
                Why did you visit?
              </span>
              <textarea
                rows={4}
                value={reason}
                maxLength={MAX}
                placeholder="Met a friend, changed trains, first time here…"
                onChange={(e) => setReason(e.target.value.slice(0, MAX))}
                className="resize-none rounded-lg border border-input bg-background px-3 py-2 text-[15px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span
                className={`self-end text-[12px] tabular-nums ${
                  reason.length >= 450
                    ? "font-semibold text-chart-5"
                    : "text-muted-foreground"
                }`}
              >
                {reason.length}/{MAX}
              </span>
            </label>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={requestClose}
                className="h-11 rounded-lg px-4 text-[15px] font-semibold tracking-tight text-muted-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!date}
                className="h-11 rounded-lg px-5 text-[15px] font-bold tracking-tight disabled:opacity-50"
                style={{ backgroundColor: lineColour, color: lineTextColour }}
              >
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved edits to this note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmDiscard(false);
                onOpenChange(false);
              }}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
