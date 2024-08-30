import { useRef, useState } from "react";

interface TimeFieldProps {
  label: string;
  onTimeFieldFilled: (value: string) => void;
}

export default function TimeField({
  label,
  onTimeFieldFilled,
}: TimeFieldProps) {
  const HourRef1 = useRef(null);
  const HourRef2 = useRef(null);
  const MinuteRef1 = useRef(null);
  const MinuteRef2 = useRef(null);

  const [hour1, setHour1] = useState("");
  const [hour2, setHour2] = useState("");
  const [minute1, setminute1] = useState("");
  const [minute2, setminute2] = useState("");

  const handleInputChange = (e: any, nextRef: any) => {
    const { value, maxLength } = e.target;
    if (value.length >= maxLength) {
      nextRef?.current?.focus();
    }
  };

  const handleKeyDown = (e: any, prevRef: any) => {
    if (e.key === "Backspace" && e.target.value === "" && prevRef) {
      prevRef.current.focus();
    }
  };

  onTimeFieldFilled(`${hour1}${hour2}.${minute1}${minute2}`);

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
            onChange={(e) => {
              handleInputChange(e, HourRef2);
              setHour1(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="flex h-full w-[54px] flex-col space-y-3">
          <input
            ref={HourRef2}
            className="h-[54px] w-full rounded-2xl p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
            maxLength={1}
            minLength={1}
            onChange={(e) => {
              handleInputChange(e, MinuteRef1);
              setHour2(e.target.value);
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
            onChange={(e) => {
              handleInputChange(e, MinuteRef2);
              setminute1(e.target.value);
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
            onKeyDown={(e) => handleKeyDown(e, MinuteRef1)}
            onChange={(e) => setminute2(e.target.value)}
          />
        </fieldset>
      </div>
    </div>
  );
}
