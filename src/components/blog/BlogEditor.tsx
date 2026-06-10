'use client'

import { useEffect, memo } from 'react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Quote, Heading1, Heading2, 
  Undo, Redo, Link as LinkIcon
} from 'lucide-react'

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
}

const MenuBar = memo(({ editor }: { editor: Editor | null }) => {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bold') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('italic') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('underline') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <UnderlineIcon size={18} />
      </button>
      <div className="w-px h-6 bg-zinc-800 self-center mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <Heading2 size={18} />
      </button>
      <div className="w-px h-6 bg-zinc-800 self-center mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('bulletList') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('orderedList') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('blockquote') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <Quote size={18} />
      </button>
      <div className="w-px h-6 bg-zinc-800 self-center mx-1" />
      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded hover:bg-zinc-800 transition-colors ${editor.isActive('link') ? 'text-[#D4AF37] bg-zinc-800' : 'text-zinc-400'}`}
      >
        <LinkIcon size={18} />
      </button>
      <div className="flex-grow" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 disabled:opacity-30"
        disabled={!editor.can().undo()}
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 disabled:opacity-30"
        disabled={!editor.can().redo()}
      >
        <Redo size={18} />
      </button>
    </div>
  )
})

MenuBar.displayName = 'MenuBar'

// Extensions are defined OUTSIDE the component to prevent duplicate extension warnings and re-initialization lag
const sharedExtensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-[#D4AF37] underline',
    },
  }),
]

const BlogEditor = ({ content, onChange }: BlogEditorProps) => {
  const editor = useEditor({
    extensions: sharedExtensions,
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-zinc max-w-none focus:outline-none min-h-[400px] p-6 text-zinc-300',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  // Handle external content updates (like clear/reset)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="w-full border border-zinc-800 rounded-xl overflow-hidden bg-black/50 focus-within:border-[#D4AF37]/50 transition-colors relative min-h-[450px]">
      <MenuBar editor={editor} />
      <div className="relative">
        {editor && editor.getHTML() === '<p></p>' && (
          <div className="absolute top-6 left-6 text-zinc-600 pointer-events-none font-light">
            Start writing your story here...
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
      
      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
        }
        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}

export default memo(BlogEditor)
