/**
 * Shape of an on-site review comment (development only).
 * Stored in .feedback/comments.json (git-ignored) so `pnpm feedback` can print them.
 */
export type FeedbackComment = {
  id: string;
  /** Permanent number shown on the marker (1, 2, 3 …), unique across the whole site, never reused. */
  number: number;
  page: string; // pathname, e.g. "/" or "/tech"
  comment: string;
  status: "open" | "resolved";
  createdAt: string;
  /** Where the marker sits: document coordinates at the time of commenting (fallback). */
  x: number;
  y: number;
  /** Re-anchoring info so the marker follows the element if the layout changes. */
  anchor: { selector: string; rx: number; ry: number };
  /** Human context for whoever acts on the comment. */
  section: string;
  elementText: string;
  viewport: { width: number; height: number };
  theme: string;
};

export type NewFeedbackComment = Omit<FeedbackComment, "id" | "number" | "status" | "createdAt">;

/** On-disk shape of .feedback/comments.json. */
export type FeedbackStore = { nextNumber: number; comments: FeedbackComment[] };
