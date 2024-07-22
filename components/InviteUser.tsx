"use client";

import { FormEvent, useState, useTransition } from "react";
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
import { toast } from "sonner";
import { Input } from "./ui/input";
import { inviteUserToRoom } from "@/actions/actions";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const room = useRoom();

  const handleInvite = (e: FormEvent) => {
    e.preventDefault();

    if (!room.id) return;

    startTransition(async () => {
      const { success } = await inviteUserToRoom(
        room.id,
        email,
      );

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User Added to Room  successfully");
      } else {
        toast.error("Failed to add user to the room");
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
        variant='outline'
      >
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite a User to collaborate!
          </DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>

        <form
          className='flex gap-2'
          onSubmit={handleInvite}
        >
          <Input
            type='email'
            placeholder='email'
            className='w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type='submit'
            disabled={!email || isPending}
          >
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default InviteUser;
