import { maxLengthCheck } from "../helpers/helpers";

interface ClassQuotaFieldProps {
  onClassQuotaChange: (value: string) => void;
  value: string;
}

export default function ClassQuotaField({
  onClassQuotaChange,
  value,
}: ClassQuotaFieldProps) {
  const displayValue = value || "";

  return (
    <fieldset className="flex h-full w-[75px] flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">Kuota</label>
      <input
        className="h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
        maxLength={2}
        minLength={0}
        type="text"
        value={displayValue}
        onChange={(event) => onClassQuotaChange(event.target.value)}
      />
    </fieldset>
  );
}
