import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";

interface ErrorDialogProps {
  dialogOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ErrorDialog({
  dialogOpen,
  onClose,
  title,
}: ErrorDialogProps) {
  return (
    <Dialog
      onClose={onClose}
      open={dialogOpen}
      as="div"
      className={`relative z-10 focus:outline-none`}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`data-[closed]:transform-[scale(95%)] flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-[#FF0000] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0`}
          >
            <div className="relative h-[100px] w-full self-center">
              <Image
                src={"/error.png"}
                alt="error"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <DialogTitle
              as="h3"
              className="mt-3 w-full self-center text-center text-xl font-extrabold text-white"
            >
              {title}
            </DialogTitle>
            <div className="mt-4">
              <Button
                className="data-[hover]:bg-white-600 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-[#FF0000] shadow-inner shadow-white/10 focus:outline-none data-[open]:bg-white"
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
