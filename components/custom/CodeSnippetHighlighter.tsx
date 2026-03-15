import { createHighlighter } from "shiki";
import CopyCode from "./CopyCode";

interface Props {
  code: string;
  lang?: string;
  theme?: string;
}

export default async function CodeSnippetHighlighter({ code, lang = "tsx", theme = "material-theme-ocean" }: Props) {
  const highlighter = await createHighlighter({
    themes: [theme],
    langs: [lang]
  });

  const html = highlighter.codeToHtml(code, { lang, theme });
  const lines = code.split("\n").length;

  return (
    <div className='w-full h-100 border border-gray-400 rounded-lg text-sm overflow-hidden flex flex-col bg-[#0A0A0A]'>
      {/* HEADER */}
      <div className='flex items-center justify-between border-b border-gray-400 p-4 flex-shrink-0 bg-[#0A0A0A] z-10'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1.5'>
            <span className='w-3 h-3 rounded-full bg-[#ff5f57]'></span>
            <span className='w-3 h-3 rounded-full bg-[#febc2e]'></span>
            <span className='w-3 h-3 rounded-full bg-[#28c840]'></span>
          </div>
          <span className='px-2 py-0.5 text-xs rounded-md bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40'>
            {lang.toUpperCase()}
          </span>
        </div>
        <CopyCode code={code} />
      </div>

      {/* SCROLLABLE CODE AREA */}
      <div className='flex-1 overflow-auto flex w-full text-gray-200 font-mono text-[13px] leading-relaxed'>
        {/* LINE NUMBERS */}
        <div className='select-none text-right pr-4 pl-2 text-gray-500'>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className='leading-relaxed'>
              {i + 1}
            </div>
          ))}
        </div>

        {/* CODE */}
        <div className='w-full' dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
