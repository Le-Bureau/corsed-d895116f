import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Options {
  folder: "covers" | "heroes" | "inline-images" | "avatars";
  postId?: string;
}

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

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
    if (file.size > MAX_BYTES) {
      setError("Fichier trop lourd. 5 Mo maximum.");
      return null;
    }

    setIsUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${postId ?? "unassigned"}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("blog-covers")
        .upload(path, file, { contentType: file.type, upsert: false });

      if (upErr) {
        setError(upErr.message);
        return null;
      }

      const { data } = supabase.storage.from("blog-covers").getPublicUrl(path);
      return data.publicUrl;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};
