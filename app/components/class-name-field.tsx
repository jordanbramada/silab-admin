interface ClassNameFieldProps {
  onClassNameChange: (value: string) => void;
  value?: string;
}

export default function ClassNameField({
  onClassNameChange,
  value,
}: ClassNameFieldProps) {
  return (
    <fieldset className="flex h-full w-[75px] flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">Kelas</label>
      <input
        className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
        maxLength={1}
        minLength={1}
        type="text"
        value={value}
        onChange={(event) => onClassNameChange(event.target.value)}
      />
    </fieldset>
  );
}
