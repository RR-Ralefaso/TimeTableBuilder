"use client";

import { useState } from "react";
import Image from "next/image";

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

  const addEntry = () => {
    if (!subject || !startTime) return;
    
    // Calculate end time (1 hour later)
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = `${String((hours + 1) % 24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    
    setEntries([...entries, { id: Date.now(), subject, startTime, endTime }]);
    setSubject("");
    setStartTime("");
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-purple-500">
      <header className="flex flex-col items-center mb-4">
        <Image src="/next.svg" alt="Next.js Logo" width={180} height={38} priority />
        <h1 className="text-2xl font-bold mt-4 text-white">STUDY TIMETABLE PRODUCTIONS</h1>
      </header>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded font-bold"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="border p-2 rounded font-bold"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded font-bold" onClick={addEntry}>
          ADD
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col items-center font-bold">
            <span className="text-lg">{entry.subject}</span>
            <span>{entry.startTime} - {entry.endTime}</span>
            <button className="text-red-500 mt-2" onClick={() => removeEntry(entry.id)}>
              REMOVE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
