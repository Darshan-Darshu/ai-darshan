"use client";

import {
  useRoom,
  useSelf,
} from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type Props = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: Boolean;
};

function BlockNote({ doc, provider, darkMode }: Props) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });
  return (
    <div className='relative max-w-6xl mx-auto'>
      <BlockNoteView
        className='min-h-screen'
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] =
    useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  // YJS -> library -> collaborative application

  useEffect(() => {
    const ydoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, ydoc);

    setDoc(ydoc);
    setProvider(yProvider);
    return () => {
      ydoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  const style = `hover:text white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-end mb-10 gap-2'>
        {/* TranslateDocument AI */}
        <TranslateDocument doc={doc} />
        {/* ChatToDocument AI */}
        <ChatToDocument doc={doc} />

        {/* Dark Mode */}
        <Button
          className={style}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Block Note */}
      <BlockNote
        doc={doc}
        provider={provider}
        darkMode={darkMode}
      />
    </div>
  );
}
export default Editor;
