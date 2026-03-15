import CodeSnippetHighlighter from "@/components/custom/CodeSnippetHighlighter";
import { Navbar } from "@/components/custom/Navbar";
import { getUserLocale } from "@/config/locale";

const pythonCodeExample = `
class User:
    def __init__(self, username, role):
        self.username = username
        self.role = role

class RoleManager:
    role_hierarchy = {
        "super_admin": ["admin"],
        "admin": ["manager"],
        "manager": ["premium_user"],
        "premium_user": ["user"],
        "user": [],
    }

    permissions = {
        "super_admin": ["all:access"],
        "admin": ["user:delete", "product:delete"],
        "manager": ["product:create", "product:update"],
        "premium_user": ["product:view"],
        "user": ["profile:view"],
    }

    @classmethod
    def get_permissions(cls, role):
        perms = set(cls.permissions.get(role, []))
        for r in cls.role_hierarchy.get(role, []):
            perms.update(cls.get_permissions(r))
        return perms

# Example usage
alice = User("alice", "manager")
print(f"Alice's permissions: {RoleManager.get_permissions(alice.role)}")
`;

const phpCodeExample = `
<?php

class BlogPost {
    private string \$title;
    private string \$content;
    private string \$author;

    public function __construct(string \$title, string \$content, string \$author) {
        \$this->title = \$title;
        \$this->content = \$content;
        \$this->author = \$author;
    }

    public function summary(): string {
        return substr(\$this->content, 0, 100) . '...';
    }

    public function display() {
        echo "<h2>{\$this->title}</h2>";
        echo "<p>" . \$this->summary() . "</p>";
        echo "<small>by {\$this->author}</small>";
    }
}

// Example usage
\$post = new BlogPost("Hello World", "This is a sample blog post content that is very long...", "Alice");
\$post->display();
?>
`;

const javaCodeExample = `
public class Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public double divide(int a, int b) {
        if (b == 0) throw new IllegalArgumentException("Cannot divide by zero");
        return (double) a / b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Add: " + calc.add(5, 3));
        System.out.println("Divide: " + calc.divide(10, 2));
    }
}
`;

const goCodeExample = `
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, world!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    fmt.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Println("Server failed:", err)
    }
}
`;

const code = `import { createHighlighter } from "shiki";
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
        <div className='select-none text-right pr-4 py-3 pl-2 text-gray-500'>
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
`;

export default async function DocsPage() {
  const locale = await getUserLocale();

  return (
    <div className='min-h-screen bg-gray-900'>
      <Navbar locale={locale} />
      <div className=' p-4 space-y-4'>
        <CodeSnippetHighlighter lang='tsx' code={code} />

        <CodeSnippetHighlighter lang='python' code={pythonCodeExample} />

        <CodeSnippetHighlighter lang='php' code={phpCodeExample} />

        <CodeSnippetHighlighter lang='java' code={javaCodeExample} />

        <CodeSnippetHighlighter lang='go' code={goCodeExample} />
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
