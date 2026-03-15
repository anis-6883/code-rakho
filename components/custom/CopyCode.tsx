"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} className='flex items-center gap-1 text-gray-400 hover:text-white transition text-xs'>
      <Copy size={14} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyCode;
