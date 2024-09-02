import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";

interface SuccessDialogProps {
  dialogOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function SuccessDialog({
  dialogOpen,
  onClose,
  title,
}: SuccessDialogProps) {
  return (
    <Dialog
      onClose={onClose}
      open={dialogOpen}
      as="div"
      className={`relative z-10 focus:outline-none`}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#E8FFF3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`}
          >
            <div className="relative h-[100px] w-full self-center">
              <Image
                src={"/success.png"}
                alt="success"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <DialogTitle
              as="h3"
              className="mt-3 w-full self-center text-center text-xl font-extrabold text-[#1D1D1D]"
            >
              {title}
            </DialogTitle>
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={onClose}
              >
                Tutup
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
