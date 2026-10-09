// Client-side image compression before upload. Supabase image transforms
// are not available on this plan, so whatever we upload is what visitors
// download: a 4 MB photo used as a 64px thumbnail is decoded at full size.

export const IMAGE_MAX_WIDTH: Record<string, number> = {
  covers: 1600,
  heroes: 1920,
  "inline-images": 1600,
  "gallery-images": 1600,
  avatars: 512,
};

const QUALITY = 0.82;

// Formats a canvas would break (animation, vectors): upload them untouched.
const SKIP_TYPES = new Set(["image/gif", "image/svg+xml"]);

const loadBitmap = async (
  blob: Blob,
): Promise<ImageBitmap | HTMLImageElement> => {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(blob);
    } catch {
      // Fall through to <img> decoding (older Safari, exotic formats).
    }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
};

/**
 * Resizes to `maxWidth` and re-encodes as WebP. Returns the original blob
 * when it is already smaller, or when the browser cannot encode WebP.
 */
export async function compressImage(
  blob: Blob,
  maxWidth: number,
): Promise<Blob> {
  if (SKIP_TYPES.has(blob.type)) return blob;

  const source = await loadBitmap(blob);
  const width = "naturalWidth" in source ? source.naturalWidth : source.width;
  const height =
    "naturalHeight" in source ? source.naturalHeight : source.height;
  const scale = Math.min(1, maxWidth / width);
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return blob;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, w, h);
  if ("close" in source) source.close();

  const out = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", QUALITY),
  );
  if (!out || out.type !== "image/webp") return blob;
  return out.size < blob.size ? out : blob;
}
