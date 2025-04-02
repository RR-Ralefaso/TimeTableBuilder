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

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <header className="flex flex-col items-center mb-6">
        <Image src="/next.svg" alt="Next.js Logo" width={180} height={38} priority />
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
          className={`px-4 py-2 rounded-lg font-bold ${subject.trim() && startTime ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
          onClick={addEntry}
          disabled={!subject.trim() || !startTime}
        >
          Add
        </button>
      </div>

      {/* Timetable container */}
      <div className="w-full max-w-lg border-2 border-white rounded-lg p-4 bg-white text-black">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border border-gray-300">Subject</th>
              <th className="p-2 border border-gray-300">Time</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(({ id, subject, startTime, endTime }) => (
              <tr key={id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{subject}</td>
                <td className="p-2 border border-gray-300">{startTime} - {endTime}</td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => removeEntry(id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with R-Cubed logo */}
      <footer className="mt-16">
        <Image src="/r-cubed-logo.png" alt="R-Cubed Logo" width={300} height={300} priority />
      </footer>
    </div>
  );
}
