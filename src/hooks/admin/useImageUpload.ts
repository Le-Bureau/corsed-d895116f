import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { compressImage, IMAGE_MAX_WIDTH } from "@/lib/compressImage";

export type ImageFolder =
  "covers" | "heroes" | "inline-images" | "avatars" | "gallery-images";

interface Options {
  folder: ImageFolder;
  postId?: string | undefined;
}

// Raw files can be large (phone/drone photos): they are compressed before
// upload, and only the compressed result must fit the bucket's 5 MB limit.
const MAX_INPUT_BYTES = 30 * 1024 * 1024;
const MAX_BYTES = 5 * 1024 * 1024;

const EXT_BY_TYPE: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

/** Compresses then uploads an image to the blog bucket. Returns its public URL. */
export async function uploadBlogImage(
  input: Blob,
  folder: ImageFolder,
  postId?: string,
): Promise<string> {
  const blob = await compressImage(input, IMAGE_MAX_WIDTH[folder] ?? 1600);
  if (blob.size > MAX_BYTES) {
    throw new Error("Image trop lourde même après compression (5 Mo maximum).");
  }
  const ext = EXT_BY_TYPE[blob.type] ?? "jpg";
  const path = `${folder}/${postId ?? "unassigned"}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-covers")
    .upload(path, blob, {
      contentType: blob.type,
      upsert: false,
      cacheControl: "31536000",
    });
  if (error) throw new Error(error.message);

  return supabase.storage.from("blog-covers").getPublicUrl(path).data.publicUrl;
}

// NOTE: When an image is replaced or removed, the previous file remains in
// the bucket as an orphan. We accept this minor cost for V1; a periodic
// cleanup script can reconcile bucket contents with referenced URLs later.
export const useImageUpload = ({ folder, postId }: Options) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Format invalide. Utilise une image (JPG, PNG, WEBP…).");
      return null;
    }
    if (file.size > MAX_INPUT_BYTES) {
      setError("Fichier trop lourd. 30 Mo maximum.");
      return null;
    }

    setIsUploading(true);
    try {
      return await uploadBlogImage(file, folder, postId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Envoi impossible.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};
