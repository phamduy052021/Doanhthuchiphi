import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type PlaylistInputProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
  error?: string | null;
  count: number;
};

export function PlaylistInput({ value, onChange, onApply, onClear, error, count }: PlaylistInputProps) {
  const [touched, setTouched] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Playlist</CardTitle>
        <CardDescription>
          Paste Google Drive video links (one per line). Example:
          <span className="block mt-1 font-mono text-xs text-muted-foreground">
            https://drive.google.com/file/d/FILE_ID/view
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setTouched(true);
          }}
          placeholder="Paste links here…"
          className="min-h-[180px]"
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">{count ? `${count} video(s) in playlist` : "No videos yet"}</div>
          <div className="flex gap-2">
            <Button type="button" onClick={onApply}>
              Add / Update playlist
            </Button>
            <Button type="button" variant="outline" onClick={onClear} disabled={!value.trim() && count === 0}>
              Clear
            </Button>
          </div>
        </div>

        {touched && error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
