import { useAudioStore } from "@/store/useAudioStore";
import { useEffect, useState } from "react";

const AudioStateMonitor = () => {
  const { currentSong, isPlaying, songs, currentSongIndex } = useAudioStore();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const newLog = `${new Date().toLocaleTimeString()}: Song: ${currentSong?.song_title || "None"}, Playing: ${isPlaying}, Index: ${currentSongIndex}`;
    setLogs((prev) => [...prev.slice(-4), newLog]); // Keep last 5 logs
  }, [currentSong, isPlaying, currentSongIndex]);

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2">Audio State Monitor</div>
      <div className="space-y-1">
        <div>Songs Loaded: {songs.length}</div>
        <div>Current: {currentSong?.song_title || "None"}</div>
        <div>Playing: {isPlaying ? "▶️" : "⏸️"}</div>
        <div>Index: {currentSongIndex}</div>
      </div>
      <div className="mt-2 border-t pt-2">
        <div className="font-semibold">Recent Changes:</div>
        {logs.map((log, index) => (
          <div key={index} className="text-xs opacity-75">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioStateMonitor;
