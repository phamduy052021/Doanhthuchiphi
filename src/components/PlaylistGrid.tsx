import { VideoCard } from "@/components/VideoCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlaylistVideo } from "@/hooks/usePlaylist";

type PlaylistGridProps = {
  videos: PlaylistVideo[];
  onPlay: (video: PlaylistVideo) => void;
  onDelete: (videoId: string) => void;
};

export function PlaylistGrid({ videos, onPlay, onDelete }: PlaylistGridProps) {
  if (!videos.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nothing here yet</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Paste one or more Google Drive links above, then click <span className="font-medium">Add / Update playlist</span>.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onPlay={() => onPlay(video)} onDelete={() => onDelete(video.id)} />
      ))}
    </div>
  );
}
