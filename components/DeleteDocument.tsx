"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRoom } from "@liveblocks/react/suspense";
import { deleteDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const room = useRoom();
  const router = useRouter();

  const handleDelete = async () => {
    if (!room.id) return;
    startTransition(async () => {
      const { success } = await deleteDocument(room.id);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Room deleted successfully");
      } else {
        toast.error("Failed the delete room");
      }
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        asChild
        variant='destructive'
      >
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to Delete?
          </DialogTitle>
          <DialogDescription>
            This will delete the document and all its
            contents, removing all users from the document
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='sm:justify-end gap-2'>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button
              variant='secondary'
              type='button'
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDocument;
