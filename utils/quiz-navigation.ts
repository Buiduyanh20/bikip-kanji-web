export type ResultEnterEvent = {
  key: string;
  repeat: boolean;
  isComposing: boolean;
  targetIsButton: boolean;
  elapsedSinceSubmit: number;
};

export function shouldAdvanceOnResultEnter(event: ResultEnterEvent): boolean {
  return event.key === "Enter"
    && !event.repeat
    && !event.isComposing
    && !event.targetIsButton
    && event.elapsedSinceSubmit >= 300;
}
