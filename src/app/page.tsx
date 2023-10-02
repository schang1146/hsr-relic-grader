'use client'

import { useRef } from "react";
import { cavernRelics } from "./relics";

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
      <h1>Honkai Star Rail Relic Scorer</h1>
      <button className="btn btn-blue" onClick={startCapture}>Start Capture</button>
      <button className="btn btn-blue" onClick={stopCapture}>Stop Capture</button>
      <video className="video" ref={videoRef} autoPlay></video>
      <select name="cavernRelics" defaultValue={cavernRelics[0].name}>
        {cavernRelics.map(relic => <option value={relic.name}>{relic.name}</option>)}
      </select>
    </main>
  )
}
