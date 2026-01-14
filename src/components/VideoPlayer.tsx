import * as React from "react";
import Hls from "hls.js";
import { Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PlaylistVideo } from "@/hooks/usePlaylist";
import { getDriveDirectDownloadUrl } from "@/services/googleDriveService";

type VideoPlayerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: PlaylistVideo | null;
};

export function VideoPlayer({ open, onOpenChange, video }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const src = React.useMemo(() => {
    if (!video) return null;
    return getDriveDirectDownloadUrl(video.id);
  }, [video]);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!open || !el || !src) return;

    let hls: Hls | null = null;

    const isM3u8 = src.toLowerCase().includes(".m3u8");

    if (isM3u8 && Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
      });
      hls.loadSource(src);
      hls.attachMedia(el);
    } else {
      el.src = src;
    }

    el.load();

    return () => {
      if (hls) hls.destroy();
      el.pause();
      el.removeAttribute("src");
    };
  }, [open, src]);

  async function requestFullscreen() {
    const el = videoRef.current;
    if (!el) return;
    try {
      await el.requestFullscreen();
    } catch {
      // ignore
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="truncate">{video?.title ?? "Player"}</DialogTitle>
              <DialogDescription className="truncate">{video ? video.url : ""}</DialogDescription>
            </div>
            <Button type="button" variant="outline" size="icon" onClick={requestFullscreen} aria-label="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="rounded-lg bg-black">
          <video ref={videoRef} className="h-full w-full max-h-[70vh]" controls playsInline />
        </div>
      </DialogContent>
    </Dialog>
  );
}
