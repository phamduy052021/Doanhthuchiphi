import axios from "axios";

export type DriveFileMetadata = {
  id: string;
  name?: string;
  sizeBytes?: number;
  mimeType?: string;
  thumbnailLink?: string;
};

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";

export function extractDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns: RegExp[] = [
    /https?:\/\/(?:www\.)?drive\.google\.com\/file\/d\/([^/]+)\//i,
    /https?:\/\/(?:www\.)?drive\.google\.com\/open\?id=([^&]+)/i,
    /https?:\/\/(?:www\.)?drive\.google\.com\/uc\?[^#]*\bid=([^&]+)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getDriveThumbnailUrl(fileId: string, size = 640): string {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${size}`;
}

export function getDriveDirectDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export async function getDriveFileMetadata(fileId: string): Promise<DriveFileMetadata | null> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;
  if (!apiKey) return null;

  try {
    const { data } = await axios.get(`${DRIVE_API_BASE}/files/${encodeURIComponent(fileId)}`, {
      params: {
        key: apiKey,
        fields: "id,name,size,mimeType,thumbnailLink",
      },
    });

    return {
      id: String(data.id ?? fileId),
      name: data.name ? String(data.name) : undefined,
      sizeBytes: data.size ? Number(data.size) : undefined,
      mimeType: data.mimeType ? String(data.mimeType) : undefined,
      thumbnailLink: data.thumbnailLink ? String(data.thumbnailLink) : undefined,
    };
  } catch {
    return null;
  }
}

export async function downloadDriveFile(options: {
  fileId: string;
  fileName: string;
  onProgress?: (progress: { loaded: number; total?: number; percent?: number }) => void;
}): Promise<void> {
  const url = getDriveDirectDownloadUrl(options.fileId);

  const response = await axios.get(url, {
    responseType: "blob",
    onDownloadProgress: (e) => {
      const loaded = e.loaded ?? 0;
      const total = e.total ?? undefined;
      const percent = total ? Math.round((loaded / total) * 100) : undefined;
      options.onProgress?.({ loaded, total, percent });
    },
  });

  const blob = response.data as Blob;

  const objectUrl = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = options.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
