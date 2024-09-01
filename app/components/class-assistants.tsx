import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { searchAsisten } from "../actions/dashboard/praktikum/tambah-praktikum/actions";

interface ClassAssistantsComboBoxProps {
  onClassAssistantsChange: (value: User[]) => void;
  value: string[];
}

export default function ClassAssistantsComboBox({
  onClassAssistantsChange,
  value,
}: ClassAssistantsComboBoxProps) {
  const [query, setQuery] = useState<string>("");
  const [asistenData, setAsistenData] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await searchAsisten(query);
        setAsistenData(data["data"]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const selectedUsers = asistenData.filter((user) => value.includes(user.id));
    setSelected(selectedUsers);
  }, [value, asistenData]);

  const handleOnAsistenChange = useCallback(
    (value: User) => {
      setSelected((prevSelected) => {
        if (!prevSelected.some((item) => item.id === value.id)) {
          const updatedSelection = [...prevSelected, value];

          setTimeout(() => onClassAssistantsChange(updatedSelection), 0);
          return updatedSelection;
        }
        return prevSelected;
      });
    },
    [onClassAssistantsChange],
  );

  const removeAsisten = useCallback(
    (user: User) => {
      setSelected((prevSelected) => {
        const updatedSelection = prevSelected.filter(
          (item) => item.id !== user.id,
        );

        setTimeout(() => onClassAssistantsChange(updatedSelection), 0);
        return updatedSelection;
      });
    },
    [onClassAssistantsChange],
  );
  return (
    <div className="block w-full">
      <p className="mb-3 text-base font-semibold text-[#5E6278]">
        Asisten Praktikum
      </p>
      <Combobox
        onChange={(value: User) => handleOnAsistenChange(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative flex flex-row">
          <Image
            alt="search icon"
            src={"/search.png"}
            width={24}
            height={24}
            className="absolute inset-y-3.5 left-4"
          />
          <ComboboxInput
            className={`h-[54px] w-full rounded-2xl bg-[#f5f5f5] pl-14 focus:outline-[#3272CA]`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton>
            <Image
              src={"/down.png"}
              alt="chevron down"
              width={24}
              height={24}
              className="absolute inset-y-3.5 right-3"
            />
          </ComboboxButton>
        </div>
        <ComboboxOptions anchor="bottom" className={`w-[1060px] rounded-2xl`}>
          {asistenData.map((asisten) => (
            <ComboboxOption
              key={asisten.id}
              value={asisten}
              className={`flex w-full flex-row items-start bg-[#f5f5f5] p-4 data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              <button
                className="h-full w-full hover:bg-[#3272CA] hover:text-white"
                onClick={() => {
                  handleOnAsistenChange(asisten);
                }}
              >
                {asisten.fullname}
              </button>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
      <div className="mt-6 flex h-full w-full flex-col space-y-6 px-10">
        {selected.length !== 0 &&
          selected.map((asisten) => (
            <div
              className={`h-[56px] w-full flex-row items-center justify-between ${asisten !== undefined ? "flex" : "hidden"}`}
              key={asisten.id}
            >
              <div className="flex flex-col">
                <p>{asisten?.fullname}</p>
                <p>{asisten?.nim}</p>
              </div>
              <button
                onClick={() => removeAsisten(asisten)}
                className="relative h-[21.5px] w-[21.5px]"
              >
                <Image
                  src={"/cross-square.png"}
                  alt="delete assistants"
                  fill
                  style={{ objectFit: "contain" }}
                  className="static"
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
