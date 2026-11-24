import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2, Cpu } from 'lucide-react';
import { playKeyClick, playSoftClick } from '../utils/audio.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface AiTerminalProps {
  theme?: 'dark' | 'light';
  accentColor?: string;
  initialSkillFilter?: string | null;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

const PRESET_CHIPS = [
  { label: '🤖 AI Stack', cmd: 'skills --ai' },
  { label: '⚡ Core Tech', cmd: 'skills' },
  { label: '🚀 Projects', cmd: 'projects' },
  { label: '💼 Hire Me', cmd: 'hire' },
  { label: '🖥️ Neofetch', cmd: 'neofetch' },
];

export const AiTerminal: React.FC<AiTerminalProps> = ({
  theme = 'dark',
  accentColor = '#3B82F6',
  initialSkillFilter,
}) => {
  const isLight = theme === 'light';
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'init --aradhya-ai',
      output: (
        <div className="text-[11px] font-mono leading-relaxed space-y-1">
          <p className="text-emerald-400 font-semibold">● Aradhya AI & FullStack Kernel v2.5.0 [Online]</p>
          <p className="text-slate-400">
            Type <span className="text-sky-400 font-bold">help</span> or click prompt chips below to run live commands.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (initialSkillFilter) {
      executeCommand(`skills --filter "${initialSkillFilter}"`);
    }
  }, [initialSkillFilter]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    triggerHaptic('light');
    playSoftClick();

    const lower = trimmed.toLowerCase();
    let output: React.ReactNode;

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      output = (
        <div className="space-y-1 text-slate-300">
          <p className="text-sky-400 font-bold">Available Commands:</p>
          <p>• <span className="text-emerald-400">skills</span> - Full developer tech matrix</p>
          <p>• <span className="text-emerald-400">skills --ai</span> - AI, LLMs, Agents & RAG expertise</p>
          <p>• <span className="text-emerald-400">projects</span> - Production systems & live links</p>
          <p>• <span className="text-emerald-400">hire</span> - Availability & collaborative engagement</p>
          <p>• <span className="text-emerald-400">neofetch</span> - Developer hardware & environment telemetry</p>
          <p>• <span className="text-emerald-400">clear</span> - Clear terminal session</p>
        </div>
      );
    } else if (lower.startsWith('skills --ai')) {
      output = (
        <div className="space-y-1 text-slate-200">
          <p className="text-purple-400 font-bold">🧠 AI & Machine Learning Architecture:</p>
          <p>• <span className="text-emerald-400">LLM Orchestration:</span> LangChain, LangGraph, Multi-Agent Systems</p>
          <p>• <span className="text-emerald-400">RAG & Retrieval:</span> Hybrid Vector Search, Milvus, Qdrant, Pinecone</p>
          <p>• <span className="text-emerald-400">Model Deployment:</span> Ollama, vLLM, HuggingFace, OpenAI/Gemini APIs</p>
          <p>• <span className="text-emerald-400">Backend AI:</span> Python, FastAPI, Async Worker Pipelines, PyTorch</p>
        </div>
      );
    } else if (lower.startsWith('skills')) {
      output = (
        <div className="space-y-1 text-slate-200">
          <p className="text-sky-400 font-bold">⚡ FullStack Core Competencies:</p>
          <p>• <span className="text-emerald-400">Frontend:</span> React 19, TypeScript, Next.js, Tailwind CSS, Framer Motion</p>
          <p>• <span className="text-emerald-400">Backend:</span> Node.js, Express, Python FastAPI, RESTful & GraphQL APIs</p>
          <p>• <span className="text-emerald-400">Databases:</span> PostgreSQL, Supabase, MongoDB, Redis, Vector DBs</p>
          <p>• <span className="text-emerald-400">DevOps & Cloud:</span> Docker, Linux, AWS, Vercel, CI/CD Actions</p>
        </div>
      );
    } else if (lower === 'projects') {
      output = (
        <div className="space-y-2 text-slate-200">
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
            <p className="text-sky-400 font-bold">1. Autonomous Multi-Agent AI Engine</p>
            <p className="text-[10px] text-slate-400">Self-evaluating agent swarm orchestrating research and code review.</p>
            <p className="text-[9.5px] font-mono text-emerald-400 mt-1">Stack: Python • FastAPI • LangGraph • VectorDB</p>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
            <p className="text-sky-400 font-bold">2. High-Performance Web SaaS & NFC Bridge</p>
            <p className="text-[10px] text-slate-400">Tactile digital identity portal with sub-second Edge response.</p>
            <p className="text-[9.5px] font-mono text-emerald-400 mt-1">Stack: React 19 • TypeScript • Tailwind • Web Audio</p>
          </div>
        </div>
      );
    } else if (lower === 'hire' || lower === 'contact') {
      output = (
        <div className="space-y-1 text-slate-200">
          <p className="text-emerald-400 font-bold">💼 Open for Strategic Roles & High-Impact Contracts:</p>
          <p>• Status: <span className="text-emerald-400 font-semibold">Ready to deploy immediately</span></p>
          <p>• Phone / WA: <span className="text-sky-300 font-mono">+91 99818 06555</span></p>
          <p>• Email: <span className="text-amber-300 font-mono">work.aradhyakashiv@gmail.com</span></p>
          <p>• Location: Indore, MP, India (Available Worldwide Remote)</p>
        </div>
      );
    } else if (lower === 'neofetch') {
      output = (
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
          <div className="text-sky-400">
            <pre className="text-[9px] leading-tight">
{`    /\\_/\\  
   ( o.o ) 
    > ^ <  
   ARADHYA `}
            </pre>
          </div>
          <div className="space-y-0.5">
            <p><span className="text-purple-400 font-bold">OS:</span> AI Linux Arch 6.8.0</p>
            <p><span className="text-purple-400 font-bold">Host:</span> Aradhya Studio (Indore)</p>
            <p><span className="text-purple-400 font-bold">Role:</span> FullStack & AI Engineer</p>
            <p><span className="text-purple-400 font-bold">Uptime:</span> 99.98% High Focus</p>
            <p><span className="text-purple-400 font-bold">Memory:</span> 128GB / 0 Latency</p>
          </div>
        </div>
      );
    } else {
      output = (
        <p className="text-red-400">
          zsh: command not found: {trimmed}. Type <span className="text-sky-400 font-bold">help</span> for options.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeyClick();
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  return (
    <div
      className={`flex flex-col h-[340px] lg:h-[380px] rounded-2xl border transition-all overflow-hidden ${
        isLight
          ? 'bg-slate-900 text-slate-100 border-slate-700 shadow-lg'
          : 'bg-[#0B0D13]/90 text-slate-200 border-white/[0.09] shadow-2xl backdrop-blur-md'
      }`}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/40 border-b border-white/[0.08] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 font-medium flex items-center gap-1.5 ml-2">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>aradhya@dev-studio: ~ (zsh)</span>
          </span>
        </div>

        <button
          onClick={() => {
            triggerHaptic('light');
            playSoftClick();
            setHistory([]);
          }}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          title="Clear screen"
          aria-label="Clear terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Screen / History */}
      <div className="flex-1 overflow-y-auto p-3.5 font-mono text-[11px] space-y-2.5 scrollbar-thin">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-sky-400 font-bold">~</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-3.5 border-l border-white/[0.06]">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Clickable Chips */}
      <div className="px-3 py-1.5 bg-black/30 border-t border-white/[0.05] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[9.5px] font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>Quick:</span>
        </span>
        {PRESET_CHIPS.map((chip) => (
          <button
            key={chip.cmd}
            onClick={() => executeCommand(chip.cmd)}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-slate-300 hover:text-white whitespace-nowrap active:scale-95 transition-all cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Interactive Command Input Line */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-black/50 border-t border-white/[0.08]">
        <span className="text-emerald-400 font-mono font-bold text-xs">➜</span>
        <span className="text-sky-400 font-mono font-bold text-xs">~</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. 'help', 'skills', 'projects')..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-500"
          aria-label="Terminal command line"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="p-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-400 hover:text-white transition-all cursor-pointer"
          title="Run command"
          aria-label="Run command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
