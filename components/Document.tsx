"use client";

import {
  FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(
    doc(db, "documents", id),
  );
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const handleUpdateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  return (
    <div className='flex-1 h-full bg-white p-5'>
      <div className='flex max-w-6xl mx-auto justify-between pb-5'>
        <form
          onSubmit={handleUpdateTitle}
          className='flex flex-1 items-center space-x-2'
        >
          {/* update title */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            type='submit'
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>

          {/* If */}
          {/* isowner && Invite User, Delete Document */}
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>
      <div className='flex max-w-6xl mx-auto justify-between items-center mb-5'>
        {/* Manage Users */}
        <ManageUsers />
        {/* Avatars */}
      </div>

      <hr className='pb-10' />
      {/* collaborative Editor */}

      <Editor />
    </div>
  );
}
export default Document;
