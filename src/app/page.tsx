'use client'

import { useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  async function startCapture() {
    try {
      if (videoRef.current) {
        videoRef.current.srcObject =
          await navigator.mediaDevices.getDisplayMedia({
            video: {
              displaySurface: "window",
            },
            audio: false,
          });
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  function stopCapture() {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  }
  
  return (
    <main>
      Hello world!
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <video id="video" ref={videoRef} autoPlay></video>
    </main>
  )
}
