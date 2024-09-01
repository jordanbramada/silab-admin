interface DatePickerProps {
  label: string;
  onDateChanges: (value: string) => void;
}

export default function DatePicker({ label, onDateChanges }: DatePickerProps) {
  return (
    <div className="flex h-[90px] w-[300px] flex-col justify-between">
      <p className="text-base font-semibold text-[#5E6278]">{label}</p>
      <input
        type="date"
        className="h-[54px] rounded-2xl bg-[#f5f5f5] px-5 font-semibold text-[#1d1d1d] focus:outline-[#3272CA]"
        onChange={(e) => onDateChanges(e.target.value)}
      />
    </div>
  );
}
