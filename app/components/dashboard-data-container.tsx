interface DashboardDataContainerProps {
  data: number;
  data2?: number | undefined;
  title: string;
  subTitle: string;
}

export default async function DashboardDataContainer({
  data,
  data2,
  title,
  subTitle,
}: DashboardDataContainerProps) {
  return (
    <div className="flex h-[280px] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
      <p className="text-7xl font-bold text-[#FFBF01]">
        {data2 && `${data} / ${data2}`}
        {!data2 && data}
      </p>
      <div className="flex flex-col text-white">
        <p className="text-[24px] font-bold">{title}</p>
        <p className="text-[18px] font-semibold">{subTitle}</p>
      </div>
    </div>
  );
}
