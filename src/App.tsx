import * as React from "react";

import { PlaylistGrid } from "@/components/PlaylistGrid";
import { PlaylistInput } from "@/components/PlaylistInput";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { PlaylistVideo } from "@/hooks/usePlaylist";
import { usePlaylist } from "@/hooks/usePlaylist";

export default function App() {
  const { inputText, setInputText, videos, applyInput, removeVideo, clearPlaylist, lastError } = usePlaylist();

  const [playerOpen, setPlayerOpen] = React.useState(false);
  const [activeVideo, setActiveVideo] = React.useState<PlaylistVideo | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">GD Playlist Viewer</h1>
          <p className="text-sm text-muted-foreground">
            Paste Google Drive links, then play in-browser or download with one click. (Public links work best.)
          </p>
        </header>

        <PlaylistInput
          value={inputText}
          onChange={setInputText}
          onApply={applyInput}
          onClear={clearPlaylist}
          error={lastError}
          count={videos.length}
        />

        <PlaylistGrid
          videos={videos}
          onPlay={(video) => {
            setActiveVideo(video);
            setPlayerOpen(true);
          }}
          onDelete={removeVideo}
        />

        <VideoPlayer
          open={playerOpen}
          onOpenChange={(open) => {
            setPlayerOpen(open);
            if (!open) setActiveVideo(null);
          }}
          video={activeVideo}
        />
      </div>
    </div>
  );
}
