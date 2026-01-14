import * as React from "react";
import { Download, Loader2, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PlaylistVideo } from "@/hooks/usePlaylist";
import { formatBytes } from "@/lib/utils";
import { downloadDriveFile } from "@/services/googleDriveService";

type VideoCardProps = {
  video: PlaylistVideo;
  onPlay: () => void;
  onDelete: () => void;
};

export function VideoCard({ video, onPlay, onDelete }: VideoCardProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadPercent, setDownloadPercent] = React.useState<number | null>(null);

  const title = video.title;
  const fileName = title.endsWith(".mp4") || title.endsWith(".m3u8") ? title : `${title}.mp4`;

  async function handleDownload() {
    try {
      setIsDownloading(true);
      setDownloadPercent(null);
      await downloadDriveFile({
        fileId: video.id,
        fileName,
        onProgress: ({ percent }) => {
          if (typeof percent === "number") setDownloadPercent(percent);
        },
      });
      toast.success("Download started");
    } catch {
      toast.error("Download failed. Make sure the file is shared publicly or add an API key later.");
    } finally {
      setIsDownloading(false);
      setDownloadPercent(null);
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
          <div className="truncate text-xs text-white/90">{video.mimeType ?? ""}</div>
          {video.metadataStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : null}
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
        <div className="text-xs text-muted-foreground">
          {typeof video.sizeBytes === "number" ? formatBytes(video.sizeBytes) : "Size: —"}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {isDownloading && downloadPercent !== null ? <Progress value={downloadPercent} /> : null}
      </CardContent>

      <CardFooter className="grid grid-cols-3 gap-2">
        <Button type="button" variant="secondary" onClick={onPlay}>
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Play</span>
        </Button>
        <Button type="button" variant="outline" onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="hidden sm:inline">Download</span>
        </Button>
        <Button type="button" variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
