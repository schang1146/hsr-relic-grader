'use client';

import { useRef } from 'react';
import { cavernRelics } from './relics';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  async function startCapture() {
    try {
      if (videoRef.current) {
        videoRef.current.srcObject = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: 'window',
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
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  return (
    <main className='w-full h-screen px-12 grid grid-cols-1 grid-rows-[60%_40%]'>
      <section className='max-h-full flex flex-col items-start justify-start gap-2'>
        <h2>Screen Capture</h2>
        <video className='flex-1 w-full min-h-0 border-solid border border-black' ref={videoRef} autoPlay></video>
        <div className='flex flex-row items-center justify-start gap-2'>
          <button className='btn btn-blue' onClick={startCapture}>
            Start Capture
          </button>
          <button className='btn btn-blue' onClick={stopCapture}>
            Stop Capture
          </button>
        </div>
      </section>
      <section>
        <h2>Grader</h2>
        <form>
          <div>
            <label htmlFor='relics'>Relic Set</label>
            <select id='relics' name='relics' defaultValue={cavernRelics[0].name}>
              {cavernRelics.map((relic) => (
                <option key={relic.id} value={relic.name}>
                  {relic.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='main-stat'>Main Stat</label>
            <input id='main-stat'></input>
          </div>
          <div>
            <label htmlFor='sub-stat-1'>Sub Stat 1</label>
            <input id='sub-stat-1'></input>
            <label htmlFor='sub-stat-1-val'>Value</label>
            <input id='sub-stat-1-val'></input>
            <label htmlFor='sub-stat-2'>Sub Stat 2</label>
            <input id='sub-stat-2'></input>
            <label htmlFor='sub-stat-2-val'>Value</label>
            <input id='sub-stat-2-val'></input>
          </div>
          <div>
            <label htmlFor='sub-stat-3'>Sub Stat 3</label>
            <input id='sub-stat-3'></input>
            <label htmlFor='sub-stat-3-val'>Value</label>
            <input id='sub-stat-3-val'></input>
            <label htmlFor='sub-stat-4'>Sub Stat 4</label>
            <input id='sub-stat-4'></input>
            <label htmlFor='sub-stat-4-val'>Value</label>
            <input id='sub-stat-4-val'></input>
          </div>
        </form>
        <div>
          <h3>Grade:</h3>
          <h4>C</h4>
        </div>
      </section>
    </main>
  );
}
