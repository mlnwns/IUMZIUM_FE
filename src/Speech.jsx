import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";

const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("녹음된 오디오 URL:", audioUrl);

        // 오디오를 재생하거나 서버로 전송하는 등의 추가 작업을 여기서 수행할 수 있습니다.
        const audio = new Audio(audioUrl);
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
