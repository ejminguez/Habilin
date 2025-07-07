import { useAudioStore } from "@/store/useAudioStore";
import { useState } from "react";

const AudioDebugger = () => {
  const { songs, currentSong, autoPlay, setAutoPlay, nextSong } =
    useAudioStore();
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const testAllAudioFiles = async () => {
    console.log("Testing all audio files...");
    const results: Record<string, any> = {};

    for (const song of songs) {
      if (song.song_url) {
        const fullUrl = `${window.location.origin}${song.song_url}`;
        try {
          const response = await fetch(fullUrl, { method: "HEAD" });
          results[song.song_title] = {
            url: fullUrl,
            accessible: response.ok,
            status: response.status,
            contentType: response.headers.get("content-type"),
            contentLength: response.headers.get("content-length"),
          };
        } catch (error) {
          results[song.song_title] = {
            url: fullUrl,
            accessible: false,
            error: error.message,
          };
        }
      }
    }

    setTestResults(results);
    console.log("Audio file test results:", results);
  };

  const testCurrentSong = async () => {
    if (!currentSong?.song_url) return;

    const fullUrl = `${window.location.origin}${currentSong.song_url}`;
    console.log("Testing current song:", fullUrl);

    try {
      // Test with HEAD request
      const headResponse = await fetch(fullUrl, { method: "HEAD" });
      console.log("HEAD response:", {
        ok: headResponse.ok,
        status: headResponse.status,
        contentType: headResponse.headers.get("content-type"),
        contentLength: headResponse.headers.get("content-length"),
      });

      // Test with GET request (partial)
      const getResponse = await fetch(fullUrl, {
        headers: { Range: "bytes=0-1023" },
      });
      console.log("GET response:", {
        ok: getResponse.ok,
        status: getResponse.status,
        contentType: getResponse.headers.get("content-type"),
      });

      // Test with Audio element
      const testAudio = new Audio();
      testAudio.addEventListener("canplay", () => {
        console.log("Audio element can play the file");
        testAudio.remove();
      });
      testAudio.addEventListener("error", (e) => {
        console.error("Audio element error:", e);
        testAudio.remove();
      });
      testAudio.src = fullUrl;
    } catch (error) {
      console.error("Error testing current song:", error);
    }
  };

  const testAutoPlay = () => {
    console.log("Testing auto-play functionality");
    console.log("Current autoPlay setting:", autoPlay);

    // Enable autoplay if not already enabled
    if (!autoPlay) {
      setAutoPlay(true);
      console.log("Enabled autoPlay");
    }

    // Move to next song to test autoplay
    console.log("Moving to next song to test autoplay...");
    nextSong();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold mb-4">Audio Debugger</h3>

      <div className="space-y-2 mb-4">
        <button
          onClick={testCurrentSong}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Current Song
        </button>

        <button
          onClick={testAllAudioFiles}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
        >
          Test All Audio Files
        </button>

        <button
          onClick={testAutoPlay}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ml-2"
        >
          Test Auto-Play
        </button>
      </div>

      <div className="mb-4 p-2 bg-yellow-100 rounded">
        <div className="text-sm">
          <div>
            <strong>Auto-Play:</strong>{" "}
            {autoPlay ? "✅ Enabled" : "❌ Disabled"}
          </div>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="mt-1 px-2 py-1 bg-yellow-500 text-white rounded text-xs"
          >
            Toggle Auto-Play
          </button>
        </div>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Test Results:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.entries(testResults).map(([title, result]) => (
              <div
                key={title}
                className={`p-2 rounded text-sm ${
                  result.accessible ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="font-medium">{title}</div>
                <div className="text-xs">
                  <div>URL: {result.url}</div>
                  <div>Status: {result.status || "Error"}</div>
                  {result.contentType && <div>Type: {result.contentType}</div>}
                  {result.error && (
                    <div className="text-red-600">Error: {result.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-600">
        <div>Current Song: {currentSong?.song_title || "None"}</div>
        <div>Total Songs: {songs.length}</div>
        <div>
          Current URL:{" "}
          {currentSong?.song_url
            ? `${window.location.origin}${currentSong.song_url}`
            : "None"}
        </div>
      </div>
    </div>
  );
};

export default AudioDebugger;
