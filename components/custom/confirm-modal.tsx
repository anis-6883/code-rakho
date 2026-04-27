import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  title: string;
  description: string;
};

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] space-y-2">
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription className="font-normal text-black text-sm">
          {description}
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
          >
            YES
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
