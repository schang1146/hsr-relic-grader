'use client';

import { useRef } from 'react';

import { RecognizeResult, createWorker } from 'tesseract.js';

import { cavernRelics, getRelicRarity } from './relics';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function getRelicRarityFromVideoFrame(): number {
    const canvas = document.createElement('canvas');
    const videoWidth = videoRef.current!.videoWidth;
    const videoHeight = videoRef.current!.videoHeight;
    const sourceX = (videoWidth * 370) / 1616;
    const sourceY = (videoHeight * 167) / 939;
    canvas.width = 5;
    canvas.height = 5;

    const canvasContext = canvas.getContext('2d');
    canvasContext?.drawImage(videoRef.current!, sourceX, sourceY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    const imageData = canvasContext?.getImageData(0, 0, canvas.width, canvas.height).data;
    if (!imageData) {
      return 0;
    }
    for (let i = 0; i < imageData.length; i += 4) {
      const red = imageData[i];
      const green = imageData[i + 1];
      const blue = imageData[i + 2];

      const rarity = getRelicRarity(red, green, blue);

      if (rarity > 0) {
        return rarity;
      }
    }

    return 0;
  }

  function getImageFromVideoFrame(nSubstats: number): string {
    const canvas = document.createElement('canvas');
    const videoWidth = videoRef.current!.videoWidth;
    const videoHeight = videoRef.current!.videoHeight;
    const sourceX = videoWidth * 0.05;
    const sourceY = videoHeight * 0.38;
    const statRowWidth = videoWidth * 0.198;
    const mainstatRowHeight = videoHeight * 0.046;
    const substatRowHeight = videoHeight * 0.036;
    canvas.width = statRowWidth;
    canvas.height = mainstatRowHeight + nSubstats * substatRowHeight;

    const canvasContext = canvas.getContext('2d');
    canvasContext?.drawImage(videoRef.current!, sourceX, sourceY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }

  async function getTextFromImage(imageURL: string) {
    const worker = await createWorker('eng');
    const data: RecognizeResult = await worker.recognize(imageURL);
    const text = data.data.text;
    await worker.terminate();
    return text;
  }

  async function gradeRelic() {
    const rarity = getRelicRarityFromVideoFrame();
    const canvasURL = getImageFromVideoFrame(rarity - 1);
    const rawStatText = await getTextFromImage(canvasURL);

    const relicStats = rawStatText
      .trim()
      .split('\n')
      .filter((statString) => {
        const isLastCharValid = statString[statString.length - 1].match(/[1-9%]/g);
        return isLastCharValid ? isLastCharValid.length > 0 : false;
      })
      .map((statString) => {
        const lastIndexOfString = statString.lastIndexOf(' ');
        return {
          stat: statString.slice(0, lastIndexOfString),
          value: statString.slice(lastIndexOfString + 1),
        };
      });

    console.log(relicStats);
  }

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
        <div>
          <button className='btn btn-blue' onClick={gradeRelic}>
            Grade Relic
          </button>
          <h3>Main Stat</h3>
          <ul>
            <li>
              <span>Def %</span>
              <span>+1</span>
              <span>10%</span>
            </li>
          </ul>
          <h3>Sub Stats</h3>
          <ul>
            <li>
              <span>Def %</span>
              <span>+1</span>
              <span>10%</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Def %</span>
              <span>+1</span>
              <span>10%</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Def %</span>
              <span>+1</span>
              <span>10%</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Def %</span>
              <span>+1</span>
              <span>10%</span>
            </li>
          </ul>
        </div>
        <div>
          <h3>Grade:</h3>
          <h4>C</h4>
        </div>
      </section>
    </main>
  );
}
