import ClassMeetingsContent from "@/app/components/praktikum/class-meetings-content";
import { getAccessToken } from "@/app/lib/sessions";
import { Class } from "@/app/types/class-details-class";
import { Suspense } from "react";
import Loading from "./loading";
import ClassTitleHeader from "@/app/components/praktikum/class-title-header";
import ClassDetailsBox from "@/app/components/praktikum/class-details-box";

export default async function ClassDetails({
  params,
}: {
  params: { classId?: string };
}) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.BASE_URL}/subject/classes/${params.classId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    },
  );
  const responseData = await response.json();
  const data: Class = responseData["data"];

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      <Suspense fallback={<Loading />}>
        <ClassTitleHeader data={data} />
        <ClassDetailsBox data={data} />
      </Suspense>
      <ClassMeetingsContent classId={data.id} />
    </div>
  );
}
