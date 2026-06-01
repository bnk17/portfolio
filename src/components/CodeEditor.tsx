import { TFunction } from 'i18next';
import { Check, Copy, FileCode, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeFile {
  tabName: string;
  language: string;
  code: string;
  explanation?: string;
}

interface TabbedCodeViewerProps {
  t: TFunction<'translation', undefined>;
  files: CodeFile[];
}

export default function TabbedCodeViewer({ t, files }: TabbedCodeViewerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) return null;

  const currentFile = files[activeTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Editor Frame Container */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-xl shadow-zinc-950/10">
        {/* Top Control Bar */}
        <div className="flex flex-col border-b border-zinc-800 bg-zinc-900/50 px-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs Scrolling Row */}
          <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {files.map((file, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={file.tabName + idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3.5 font-mono text-xs font-medium whitespace-nowrap transition-all outline-none ${
                    isActive
                      ? 'border-zinc-400 bg-zinc-950/40 text-zinc-100'
                      : 'border-transparent text-zinc-500 hover:bg-zinc-900/20 hover:text-zinc-300'
                  } `}
                >
                  <FileCode
                    className={`size-3.5 ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}
                  />
                  {file.tabName}
                </button>
              );
            })}
          </div>

          {/* Editor Action Utilities */}
          <div className="hidden items-center gap-3 py-2 sm:flex">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-zinc-600 uppercase">
              {currentFile.language}
            </span>
            <div className="h-3 w-px bg-zinc-800" />
            <button
              onClick={handleCopy}
              className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              title="Copy code snippet"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px] text-emerald-400">
                    {t('projects.editor.copied')}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 transition-transform group-hover:scale-105" />
                  <span className="font-mono text-[11px]">
                    {t('projects.editor.copy')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Canvas View area */}
        <div className="bg-zinc-950 selection:bg-zinc-800">
          <SyntaxHighlighter
            language={currentFile.language.toLowerCase()}
            style={coldarkDark}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '13px',
              lineHeight: '1.8',
              backgroundColor: 'transparent',
              maxHeight: '600px',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'inherit',
              },
            }}
          >
            {currentFile.code}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Dynamic Context Explanation Block */}
      {currentFile.explanation && (
        <div className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-zinc-950">
          <Terminal className="mt-0.5 size-4 shrink-0 text-zinc-400" />
          <p className="text-xs leading-relaxed whitespace-pre-wrap italic sm:text-sm">
            {currentFile.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
