import { getAccessToken } from "@/app/lib/sessions";

interface AnnouncementDetailsProps {
  params: { id: string };
}

export default async function AnnouncementDetails({
  params,
}: AnnouncementDetailsProps) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.BASE_URL}/announcements/${params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const responseData = await response.json();
  const announcement = responseData["data"];

  return (
    <div className="w-full overflow-auto overscroll-contain">
      <div className="flex w-full flex-col">
        <p className="mt-10 text-[22px] font-bold text-[#1D1D1D]">
          {announcement.title}
        </p>
        <p className="mt-10 text-[18px] font-semibold text-[#1D1D1D]">
          {announcement.body}
        </p>

        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/20" />
        <div className="flex w-full flex-col space-y-10">
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Tanggal / Waktu Posting
            </p>
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
              {new Date(announcement.created_at).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
