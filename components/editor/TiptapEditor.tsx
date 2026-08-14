"use client";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({
        placeholder:
          "Start writing your article...",
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

useEffect(() => {
  if (!editor) return;

  if (editor.getHTML() !== value) {
    editor.commands.setContent(value || "");
  }
}, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg border">

      <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-3">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="rounded border px-3 py-1"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="rounded border px-3 py-1"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className="rounded border px-3 py-1"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded border px-3 py-1"
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="rounded border px-3 py-1"
        >
          Numbered List
        </button>

      </div>

      <EditorContent
        editor={editor}
        className="min-h-[450px] p-6"
      />

    </div>
  );
}
