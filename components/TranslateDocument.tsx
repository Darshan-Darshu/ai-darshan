import * as Y from "yjs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Markdown from "react-markdown";
import { FormEvent, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";

type Language =
  | "english"
  | "spanish"
  | "tamil"
  | "french"
  | "german"
  | "chinese"
  | "kannada"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "tamil",
  "french",
  "german",
  "chinese",
  "kannada",
  "hindi",
  "russian",
  "japanese",
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc
        .get("document-store")
        .toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        },
      );

      if (res.ok) {
        const { translated_text } = await res.json();

        setSummary(translated_text);
        toast.success("Translated Summary successfully!!");
      } else {
        toast.error("");
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
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and Ai will translate a
            summary of the document in the selected language
          </DialogDescription>

          <hr className='mt-5' />

          {question && (
            <p className='mt-5 text-gray-500'>
              Q: {question}
            </p>
          )}
        </DialogHeader>

        {summary && (
          <div className='flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100'>
            <div className='flex'>
              <BotIcon />
              <p className='font-bold'>
                Dhruv AI{" "}
                {isPending ? "is thinking" : "Says"}
              </p>
            </div>
            <p>
              {isPending ? (
                "Thinking..."
              ) : (
                <Markdown>{summary}</Markdown>
              )}
            </p>
          </div>
        )}

        <form
          className='flex gap-2'
          onSubmit={handleAskQuestion}
        >
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a Language' />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem
                  key={language}
                  value={language}
                >
                  {language.charAt(0).toUpperCase() +
                    language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type='submit'
            disabled={!language || isPending}
          >
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default TranslateDocument;
