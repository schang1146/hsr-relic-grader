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
      <button className="btn btn-blue" onClick={startCapture}>Start Capture</button>
      <button className="btn btn-blue" onClick={stopCapture}>Stop Capture</button>
      <video className="border-solid border-2 border-blue-300" ref={videoRef} autoPlay></video>
    </main>
  )
}
