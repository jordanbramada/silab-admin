"use client";

import { getAllSessions } from "@/app/actions/dashboard/master-data/session/action";
import { SessionData } from "@/app/types/session-data";
import { useEffect, useState } from "react";

export default function Session() {
  const [sessions, setSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllSessions();

      if (response["status"] === "success") {
        setSessions(response["data"]["sessions"]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <table className="h-fit w-full table-auto p-4">
        <thead className="h-[48px] w-full rounded-full border-b border-[#3272CA]/30 text-left">
          <tr>
            <th>Sesi</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.session}</td>
              <td>{session.start_time}</td>
              <td>{session.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="h-[54px] w-[140px] self-end rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]">
        Tambah Sesi
      </button>
    </div>
  );
}
