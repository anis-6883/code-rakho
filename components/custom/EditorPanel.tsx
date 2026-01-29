"use client";

import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/constants";
import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Editor } from "@monaco-editor/react";
import { TypeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

export default function EditorPanel() {
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  // const handleRefresh = () => {
  //   const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
  //   if (editor) editor.setValue(defaultCode);
  //   localStorage.removeItem(`editor-code-${language}`);
  // };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className='relative'>
      <div className='relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/5 h-[95vh] px-6 py-4'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5'>
              <Image src={"/" + language + ".png"} alt='Logo' width={24} height={24} />
            </div>
            <div>
              <h2 className='text-sm font-medium text-white'>Code Editor</h2>
              <p className='text-xs text-gray-500'>Write and execute your code</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-3'>
              <ThemeSelector />
              <LanguageSelector hasAccess />
            </div>
            {/* Font Size Slider */}
            <div className='flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5'>
              <TypeIcon className='size-4 text-gray-400' />
              <div className='flex items-center gap-3'>
                <input
                  type='range'
                  min='12'
                  max='24'
                  value={fontSize}
                  onChange={e => handleFontSizeChange(parseInt(e.target.value))}
                  className='w-20 h-1 bg-gray-600 rounded-lg cursor-pointer'
                />
                <span className='text-sm font-medium text-gray-400 min-w-8 text-center'>{fontSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor  */}
        <div className='relative group rounded-xl overflow-hidden ring-1 ring-white/5'>
          <Editor
            height='520px'
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            onChange={handleEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            onMount={editor => setEditor(editor)}
            options={{
              minimap: { enabled: false },
              fontSize,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderWhitespace: "selection",
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              fontLigatures: true,
              cursorBlinking: "smooth",
              smoothScrolling: true,
              contextmenu: true,
              renderLineHighlight: "all",
              lineHeight: 1.6,
              letterSpacing: 0.5,
              roundedSelection: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
