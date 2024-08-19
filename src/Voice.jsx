import React, { useState } from "react";
import axios from "axios";

const Voice = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTTS = async () => {
    if (!text) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
        `speaker=nara&volume=0&speed=0&pitch=0&format=mp3&text=${encodeURIComponent(
          text
        )}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-NCP-APIGW-API-KEY-ID": "64bj0dshmk",
            "X-NCP-APIGW-API-KEY": "5eKIRKmrKPEPsUyO77yhDIWnrry3pRp4yJ35B9fm",
          },
          responseType: "arraybuffer",
        }
      );

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(response.data);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error("TTS API 호출 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="텍스트를 입력하세요"
      />
      <button onClick={handleTTS} disabled={isLoading}>
        {isLoading ? "처리 중..." : "읽어주기"}
      </button>
    </div>
  );
};

export default Voice;
