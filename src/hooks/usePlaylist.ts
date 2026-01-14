import * as React from "react";

import {
  extractDriveFileId,
  getDriveFileMetadata,
  getDriveThumbnailUrl,
  type DriveFileMetadata,
} from "@/services/googleDriveService";

export type PlaylistVideo = {
  id: string;
  url: string;
  title: string;
  thumbnailUrl?: string;
  sizeBytes?: number;
  mimeType?: string;
  metadataStatus: "idle" | "loading" | "loaded" | "error";
};

const STORAGE_KEY = "gd-playlist-viewer:urls";

function buildTitle(fileId: string, index: number) {
  return `Video ${index + 1} (${fileId.slice(0, 8)}…)`;
}

function normalizeUrls(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function usePlaylist() {
  const [inputText, setInputText] = React.useState<string>("");
  const [videos, setVideos] = React.useState<PlaylistVideo[]>([]);
  const [lastError, setLastError] = React.useState<string | null>(null);

  const requestedMetadataRef = React.useRef<Set<string>>(new Set());
  const videoIdsKey = React.useMemo(() => videos.map((v) => v.id).join("|"), [videos]);

  const setPlaylistFromUrls = React.useCallback((urls: string[]) => {
    const deduped = new Map<string, string>();
    const invalid: string[] = [];

    for (const url of urls) {
      const fileId = extractDriveFileId(url);
      if (!fileId) {
        invalid.push(url);
        continue;
      }

      if (!deduped.has(fileId)) {
        deduped.set(fileId, url);
      }
    }

    const next = Array.from(deduped.entries()).map(([fileId, url], index) => ({
      id: fileId,
      url,
      title: buildTitle(fileId, index),
      thumbnailUrl: getDriveThumbnailUrl(fileId),
      metadataStatus: "idle" as const,
    }));

    requestedMetadataRef.current = new Set();

    setVideos(next);
    setLastError(
      invalid.length
        ? `Ignored ${invalid.length} invalid link(s). Make sure each line looks like: https://drive.google.com/file/d/{FILE_ID}/view`
        : null
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(deduped.values())));
    } catch {
      // ignore
    }
  }, []);

  const applyInput = React.useCallback(() => {
    setPlaylistFromUrls(normalizeUrls(inputText));
  }, [inputText, setPlaylistFromUrls]);

  const removeVideo = React.useCallback((fileId: string) => {
    setVideos((prev) => {
      const next = prev.filter((v) => v.id !== fileId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map((v) => v.url)));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const clearPlaylist = React.useCallback(() => {
    setVideos([]);
    setInputText("");
    setLastError(null);
    requestedMetadataRef.current = new Set();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const urls = JSON.parse(raw) as unknown;
      if (!Array.isArray(urls)) return;
      const normalized = urls.filter((x): x is string => typeof x === "string");
      setInputText(normalized.join("\n"));
      setPlaylistFromUrls(normalized);
    } catch {
      // ignore
    }
  }, [setPlaylistFromUrls]);

  React.useEffect(() => {
    let canceled = false;

    async function hydrateOne(video: PlaylistVideo): Promise<DriveFileMetadata | null> {
      return getDriveFileMetadata(video.id);
    }

    async function run() {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;
      if (!apiKey) return;

      const targets = videos.filter((v) => v.metadataStatus === "idle" && !requestedMetadataRef.current.has(v.id));
      if (!targets.length) return;

      for (const v of targets) {
        requestedMetadataRef.current.add(v.id);
        setVideos((prev) => prev.map((x) => (x.id === v.id ? { ...x, metadataStatus: "loading" } : x)));

        const meta = await hydrateOne(v);
        if (canceled) return;

        if (!meta) {
          setVideos((prev) => prev.map((x) => (x.id === v.id ? { ...x, metadataStatus: "error" } : x)));
          continue;
        }

        setVideos((prev) =>
          prev.map((x, index) => {
            if (x.id !== v.id) return x;

            const title = meta.name || buildTitle(v.id, index);
            return {
              ...x,
              title,
              sizeBytes: meta.sizeBytes,
              mimeType: meta.mimeType,
              thumbnailUrl: meta.thumbnailLink ?? x.thumbnailUrl,
              metadataStatus: "loaded",
            };
          })
        );
      }
    }

    void run();

    return () => {
      canceled = true;
    };
  }, [videoIdsKey]);

  return {
    inputText,
    setInputText,
    videos,
    applyInput,
    removeVideo,
    clearPlaylist,
    lastError,
  };
}
