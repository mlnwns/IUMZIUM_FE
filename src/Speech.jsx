import React, { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [ffmpeg, setFfmpeg] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
    };
    loadFFmpeg();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const mp3Blob = await convertToMp3(audioBlob);
        const mp3Url = URL.createObjectURL(mp3Blob);
        console.log("녹음된 MP3 오디오 URL:", mp3Url);

        // MP3 오디오를 재생
        const audio = new Audio(mp3Url);
        audio.play();
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      audioChunks.current = [];
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const convertToMp3 = async (audioBlob) => {
    if (!ffmpeg) {
      console.error("FFmpeg is not loaded yet");
      return audioBlob;
    }

    const inputName = "input.webm";
    const outputName = "output.mp3";

    await ffmpeg.writeFile(inputName, await fetchFile(audioBlob));

    await ffmpeg.exec(["-i", inputName, "-acodec", "libmp3lame", outputName]);

    const data = await ffmpeg.readFile(outputName);
    return new Blob([data.buffer], { type: "audio/mp3" });
  };

  return (
    <div>
      <button
        onClick={toggleRecording}
        className={`ml-2 p-2 rounded-md transition-colors ${
          isRecording
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        <Mic size={20} />
      </button>
    </div>
  );
};

export default Speech;
