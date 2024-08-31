import { useEffect, useRef, useState } from "react";

interface TimeFieldProps {
  label: string;
  onTimeChange: (value: string) => void;
  value: string;
}

export default function TimeField({
  label,
  onTimeChange,
  value,
}: TimeFieldProps) {
  const HourRef1 = useRef<HTMLInputElement>(null);
  const HourRef2 = useRef<HTMLInputElement>(null);
  const MinuteRef1 = useRef<HTMLInputElement>(null);
  const MinuteRef2 = useRef<HTMLInputElement>(null);

  const [hour1, setHour1] = useState(value[0] || "");
  const [hour2, setHour2] = useState(value[1] || "");
  const [minute1, setMinute1] = useState(value[2] || "");
  const [minute2, setMinute2] = useState(value[3] || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement>,
  ) => {
    const { value, maxLength } = e.target;
    if (value.length >= maxLength) {
      nextRef.current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    prevRef: React.RefObject<HTMLInputElement>,
  ) => {
    if (
      e.key === "Backspace" &&
      (e.target as HTMLInputElement).value === "" &&
      prevRef.current
    ) {
      prevRef.current.focus();
    }
  };

  useEffect(() => {
    const formattedValue = value.replace(/[^0-9]/g, "");
    setHour1(formattedValue[0] || "");
    setHour2(formattedValue[1] || "");
    setMinute1(formattedValue[2] || "");
    setMinute2(formattedValue[3] || "");
  }, [value]);

  const updateTime = (
    newHour1: string,
    newHour2: string,
    newMinute1: string,
    newMinute2: string,
  ) => {
    const newTime = `${newHour1}${newHour2}:${newMinute1}${newMinute2}`;
    onTimeChange(newTime);
  };

  return (
    <div className="flex flex-col space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">{label}</p>
      <div className="flex flex-row items-center space-x-2">
        <fieldset className="flex h-full w-[54px] flex-col space-y-3">
          <input
            ref={HourRef1}
            className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            maxLength={1}
            minLength={1}
            value={hour1}
            onChange={(e) => {
              if (e.target.value !== ":") {
                setHour1(e.target.value);
                handleInputChange(e, HourRef2);
                updateTime(e.target.value, hour2, minute1, minute2);
              }
            }}
          />
        </fieldset>
        <fieldset className="flex h-full w-[54px] flex-col space-y-3">
          <input
            ref={HourRef2}
            className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            maxLength={1}
            minLength={1}
            value={hour2}
            onChange={(e) => {
              if (e.target.value !== ":") {
                setHour2(e.target.value);
                handleInputChange(e, MinuteRef1);
                updateTime(hour1, e.target.value, minute1, minute2);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, HourRef1)}
          />
        </fieldset>
        <div className="flex h-full flex-col justify-center space-y-3">
          <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
          <div className="h-[5px] w-[5px] rounded-full bg-[#1D1D1D]"></div>
        </div>
        <fieldset className="flex h-full w-[54px] flex-col space-y-3">
          <input
            ref={MinuteRef1}
            className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            maxLength={1}
            minLength={1}
            value={minute1}
            onChange={(e) => {
              if (e.target.value !== ":") {
                setMinute1(e.target.value);
                handleInputChange(e, MinuteRef2);
                updateTime(hour1, hour2, e.target.value, minute2);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, HourRef2)}
          />
        </fieldset>
        <fieldset className="flex h-full w-[54px] flex-col space-y-3">
          <input
            ref={MinuteRef2}
            className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            maxLength={1}
            minLength={1}
            value={minute2}
            onKeyDown={(e) => handleKeyDown(e, MinuteRef1)}
            onChange={(e) => {
              if (e.target.value !== ":") {
                setMinute2(e.target.value);
                updateTime(hour1, hour2, minute1, e.target.value);
              }
            }}
          />
        </fieldset>
      </div>
    </div>
  );
}
