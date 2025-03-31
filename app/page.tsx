"use client";

import { useState } from "react";
import Image from "next/image";

interface TimetableEntry {
  id: number;
  subject: string;
  time: string;
}

export default function Home() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");

  const addEntry = () => {
    if (!subject || !time) return;
    setEntries([...entries, { id: Date.now(), subject, time }]);
    setSubject("");
    setTime("");
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-purple-500">
      <header className="flex flex-col items-center mb-4">
        <Image src="/next.svg" alt="Next.js Logo" width={180} height={38} priority />
        <h1 className="text-2xl font-bold mt-4 text-white">Study Timetable Productions</h1>
      </header>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addEntry}>
          Add
        </button>
      </div>
      <ul className="w-full max-w-md">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between p-2 border-b text-white">
            <span>{entry.time} - {entry.subject}</span>
            <button className="text-red-500" onClick={() => removeEntry(entry.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
