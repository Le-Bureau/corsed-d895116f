/**
 * Helpers to insert markdown / HTML snippets into a textarea while keeping
 * the cursor/selection in a useful place.
 */

export type SnippetKind =
  | "bold"
  | "italic"
  | "h2"
  | "h3"
  | "link"
  | "ul"
  | "quote"
  | "code"
  | "figure"
  | "figureWide"
  | "imageGrid"
  | "callout";

interface InsertResult {
  next: string;
  selectionStart: number;
  selectionEnd: number;
}

const wrap = (
  value: string,
  start: number,
  end: number,
  prefix: string,
  suffix: string,
  placeholder = "texte",
): InsertResult => {
  const selected = value.slice(start, end) || placeholder;
  const next = value.slice(0, start) + prefix + selected + suffix + value.slice(end);
  return {
    next,
    selectionStart: start + prefix.length,
    selectionEnd: start + prefix.length + selected.length,
  };
};

const linePrefix = (
  value: string,
  start: number,
  end: number,
  prefix: string,
  placeholder = "texte",
): InsertResult => {
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const selected = value.slice(start, end) || placeholder;
  const before = value.slice(0, lineStart);
  const after = value.slice(end);
  const middle = value.slice(lineStart, start) + prefix + selected;
  const next = before + middle + after;
  const cursor = before.length + middle.length;
  return { next, selectionStart: cursor - selected.length, selectionEnd: cursor };
};

const block = (
  value: string,
  start: number,
  end: number,
  snippet: string,
): InsertResult => {
  const before = value.slice(0, start);
  const after = value.slice(end);
  // Ensure the snippet is on its own block (blank line before/after if needed).
  const needsBeforeBlank = before.length > 0 && !before.endsWith("\n\n");
  const needsAfterBlank = after.length > 0 && !after.startsWith("\n\n");
  const prefix = needsBeforeBlank ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
  const suffix = needsAfterBlank ? (after.startsWith("\n") ? "\n" : "\n\n") : "";
  const next = before + prefix + snippet + suffix + after;
  const cursor = before.length + prefix.length + snippet.length;
  return { next, selectionStart: cursor, selectionEnd: cursor };
};

export const FIGURE_SNIPPET = `<figure>
  <img src="https://" alt="Description de l'image" />
  <figcaption>Légende facultative.</figcaption>
</figure>`;

export const FIGURE_WIDE_SNIPPET = `<figure class="wide">
  <img src="https://" alt="Description de l'image" />
  <figcaption>Légende facultative.</figcaption>
</figure>`;

export const IMAGE_GRID_SNIPPET = `<div class="image-grid">
  <figure>
    <img src="https://" alt="Image 1" />
    <figcaption>Légende 1</figcaption>
  </figure>
  <figure>
    <img src="https://" alt="Image 2" />
    <figcaption>Légende 2</figcaption>
  </figure>
</div>`;

export const CALLOUT_SNIPPET = `<div class="callout">
  <div class="callout__icon">i</div>
  <p>Texte du callout.</p>
</div>`;

export const applySnippet = (
  kind: SnippetKind,
  value: string,
  start: number,
  end: number,
): InsertResult => {
  switch (kind) {
    case "bold":
      return wrap(value, start, end, "**", "**", "texte en gras");
    case "italic":
      return wrap(value, start, end, "*", "*", "texte en italique");
    case "code":
      return wrap(value, start, end, "`", "`", "code");
    case "link": {
      const selected = value.slice(start, end) || "texte du lien";
      const snippet = `[${selected}](https://)`;
      const next = value.slice(0, start) + snippet + value.slice(end);
      return {
        next,
        selectionStart: start + snippet.length - 9, // inside (https://)
        selectionEnd: start + snippet.length - 1,
      };
    }
    case "h2":
      return linePrefix(value, start, end, "## ", "Sous-titre");
    case "h3":
      return linePrefix(value, start, end, "### ", "Sous-titre");
    case "ul":
      return linePrefix(value, start, end, "- ", "élément");
    case "quote":
      return linePrefix(value, start, end, "> ", "citation");
    case "figure":
      return block(value, start, end, FIGURE_SNIPPET);
    case "figureWide":
      return block(value, start, end, FIGURE_WIDE_SNIPPET);
    case "imageGrid":
      return block(value, start, end, IMAGE_GRID_SNIPPET);
    case "callout":
      return block(value, start, end, CALLOUT_SNIPPET);
  }
};
