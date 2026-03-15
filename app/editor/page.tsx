import EditorPanel from "@/components/custom/EditorPanel";
import { Navbar } from "@/components/custom/Navbar";
import { getUserLocale } from "@/config/locale";

export default async function EditorPage() {
  const locale = await getUserLocale();
  return (
    <div className='min-h-screen bg-gray-900'>
      <Navbar locale={locale} />
      <div className='max-w-450 mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
          <EditorPanel />
          {/* <OutputPanel /> */}
        </div>
      </div>

      <footer className='border-t border-slate-800/50 py-8 px-6 md:px-12'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-linear-to-br from-blue-500 to-cyan-500 rounded-md'></div>
            <span>Root Code Snipper © 2026</span>
          </div>
          <div className='flex gap-6'>
            <a href='#' className='hover:text-slate-200 transition-colors'>
              Privacy
            </a>
            <a href='#' className='hover:text-slate-200 transition-colors'>
              Terms
            </a>
            <a href='#' className='hover:text-slate-200 transition-colors'>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
