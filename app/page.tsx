"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";

interface TimetableEntry {
  id: number;
  subject: string;
  startTime: string;
  endTime: string;
}

export default function Home() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const timetableRef = useRef<HTMLDivElement>(null); // Reference to timetable div

  const addEntry = () => {
    if (!subject.trim() || !startTime) return;

    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = `${String((hours + 1) % 24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    setEntries((prev) => [
      ...prev,
      { id: Date.now(), subject: subject.trim(), startTime, endTime },
    ]);
    setSubject("");
    setStartTime("");
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const downloadImage = () => {
    if (timetableRef.current) {
      toPng(timetableRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "timetable.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Failed to capture timetable as image:", error);
        });
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <header className="flex flex-col items-center mb-6">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-extrabold mt-4">Study Timetable</h1>
      </header>

      <div className="flex gap-3 mb-6 w-full max-w-lg">
        <input
          className="flex-1 border border-gray-300 p-2 rounded-lg text-black"
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-lg text-black"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-bold"
          onClick={addEntry}
        >
          Add
        </button>
      </div>

      <div
        ref={timetableRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl border border-white rounded-lg p-4 bg-white"
      >
        {entries.map(({ id, subject, startTime, endTime }) => (
          <div
            key={id}
            className="bg-white text-black p-4 rounded-lg shadow-lg flex flex-col items-center border border-gray-300"
          >
            <span className="text-lg font-semibold">{subject}</span>
            <span className="text-sm">
              {startTime} - {endTime}
            </span>
            <button
              className="text-red-500 mt-2 hover:underline"
              onClick={() => removeEntry(id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold mt-6"
        onClick={downloadImage}
      >
        Download Timetable as Image
      </button>

      {/* Footer with R-Cubed logo */}
      <footer className="mt-16">
        <h1 className="text-6xl font-extrabold text-white">R-Cubed</h1>
      </footer>
    </div>
  );
}
